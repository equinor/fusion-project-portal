import { Search } from '@equinor/eds-core-react';
import { GroupWrapper, InfoMessage, LoadingMenu, PortalMenu, StyledCategoryItem } from '@equinor/portal-ui';
import { useObservable, customAppGroupArraySort, getDisabledApps, getPinnedAppsGroup } from '@portal/utils';
import { combineLatest, map } from 'rxjs';

import { menuFavoritesController, useMenuContext } from '@equinor/portal-core';
import { useAppModule, useAppGroupsQuery, appsMatchingSearch } from '@portal/core';
import { useState, useMemo } from 'react';
import { css } from '@emotion/css';

const styles = {
	divider: css`
		border-right: 1px solid #dcdcdc;
		height: 90%;
	`,
	categoryWrapper: css`
		display: flex;
		flex-direction: column;
		padding-bottom: 2rem;
		white-space: nowrap;
		max-height: 100%;
		width: 300px;
		gap: 1rem;
	`,

	menuWrapper: css`
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 1rem 0 1rem 0;
		gap: 1rem;
		height: 90%;
		padding-top: 2rem;
	`,
};

export function MenuGroups() {
	const { data, isLoading } = useAppGroupsQuery();
	const { searchText, setSearchText } = useMenuContext();
	const { fusion } = useAppModule();
	const [activeItem, setActiveItem] = useState('All Apps');

	const favorites$ = useMemo(
		() =>
			combineLatest([fusion.modules.app.getAllAppManifests(), menuFavoritesController.favorites$]).pipe(
				map(([appManifest, favorites]) =>
					appManifest.filter((appManifest) => favorites.includes(appManifest.key))
				)
			),
		[fusion.modules.app.getAllAppManifests]
	);

	const favorites = useObservable(favorites$) ?? [];

	const categoryItems = ['Pinned Apps', ...(data?.map((item) => item.name) ?? []), 'All Apps'];

	const favoriteGroup = useMemo(() => {
		const enabledApps = (data?.map((group) => group.apps) ?? []).flat();
		const disabledApps = getDisabledApps(enabledApps, favorites);
		return getPinnedAppsGroup(enabledApps, disabledApps, favorites);
	}, [favorites, data]);

	const displayAppGroups = useMemo(() => {
		if (activeItem.includes('Pinned Apps') && searchText === '') {
			return [favoriteGroup];
		}
		if (activeItem.includes('All Apps') || searchText != '') {
			const appSearch = appsMatchingSearch(data ?? [], searchText);
			return appSearch.sort((a, b) => customAppGroupArraySort(a, b, activeItem));
		}
		const filteredApps = data?.filter((obj) => obj.name === activeItem);
		return filteredApps;
	}, [searchText, activeItem, data, favoriteGroup]);

	const hasApps = useMemo(() => Boolean(data && data.length !== 0), [data]);

	const handleToggle = (name: string) => {
		if (activeItem === name) {
			setActiveItem('All Apps');
		} else {
			setActiveItem(name);
		}
	};

	const BREAK_COL_COUNT = 15;

	return (
		<PortalMenu>
			<Search
				id="app-search"
				placeholder={'Search for apps'}
				disabled={!hasApps}
				title={hasApps ? 'Search for apps' : 'Please select a contest to be able to search'}
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			<div className={styles.menuWrapper}>
				{isLoading ? (
					<LoadingMenu />
				) : (
					<>
						<div className={styles.divider}>
							<div className={styles.categoryWrapper}>
								{categoryItems.map((item, index) => (
									<StyledCategoryItem
										key={index}
										name={item}
										isActive={activeItem === item}
										onClick={() => handleToggle(item)}
									/>
								))}
							</div>
						</div>
						{displayAppGroups && !!displayAppGroups?.length ? (
							activeItem.includes('Pinned Apps') && favorites?.length === 0 ? (
								<InfoMessage>
									Looks like you do not have any pinned apps yet. <br /> Click the star icon on apps
									to add them to the pinned app section.
								</InfoMessage>
							) : (
								<GroupWrapper appGroups={displayAppGroups} maxAppsInColumn={BREAK_COL_COUNT} />
							)
						) : (
							<>
								{searchText ? (
									<InfoMessage>No results found for your search.</InfoMessage>
								) : !hasApps ? (
									<InfoMessage>
										Please select a context to display a list of applications.
									</InfoMessage>
								) : null}
							</>
						)}
					</>
				)}
			</div>
		</PortalMenu>
	);
}
