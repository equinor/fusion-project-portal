import { Search } from '@equinor/eds-core-react';
import { useAppGroupsQuery, appsMatchingSearch } from '@equinor/portal-core';
import {
	GroupWrapper,
	LoadingMenu,
	PortalMenu,
	StyledCategoryItem
} from '@equinor/portal-ui';
import {
	useObservable,
	getMenuWidth,
	getColumnCount,
	customAppgroupArraySort,
	getDisabledApps,
	getPinnedAppsGroup,
} from '@equinor/portal-utils';
import { combineLatest, map } from 'rxjs';
import { InfoMessage } from 'packages/portal-ui/src/lib/info-message/InfoMessage';
import { menuFavoritesController, useAppModule, useMenuContext } from '@equinor/portal-core';
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
	appsWrapper: (count: number) => css`
		padding: 0 0 1rem 1rem;
		height: 600px;
		display: block;
		grid-template-columns: auto;
		padding-bottom: 2rem;
		column-width: auto;
		gap: 1rem;
		column-count: ${count};
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

	const favorites =
		useObservable(
			combineLatest([fusion.modules.app.getAllAppManifests(), menuFavoritesController.favorites$]).pipe(
				map(([appManifest, favorites]) =>
					appManifest.filter((appManifest) => favorites.includes(appManifest.key))
				)
			)
		) ?? [];

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
			return appSearch.sort((a, b) => customAppgroupArraySort(a, b, activeItem));
		}
		const filteredApps = data?.filter((obj) => obj.name === activeItem);
		return filteredApps;
	}, [searchText, activeItem, data, favoriteGroup]);

	const handleToggle = (name: string) => {
		if (activeItem === name) {
			setActiveItem('');
		} else {
			setActiveItem(name);
		}
	};

	const BREAK_COL_2 = 12;
	const BREAK_COL_3 = 25;

	return (
		<PortalMenu width={getMenuWidth(BREAK_COL_2, BREAK_COL_3, data)}>
			<Search
				id="app-search"
				placeholder={"Search for apps"}
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
									Looks like you do not have any pinned apps yet. Click the star icon on apps to add
									them to the pinned app section.
								</InfoMessage>
							) : (
								<div className={styles.appsWrapper(getColumnCount(BREAK_COL_2, BREAK_COL_3, data))}>
									<GroupWrapper appGroups={displayAppGroups} />
								</div>
							)
						) : (
							<>{searchText ? <InfoMessage>No results found for your search.</InfoMessage> : null}</>
						)}
					</>
				)}
			</div>
		</PortalMenu>
	);
}
