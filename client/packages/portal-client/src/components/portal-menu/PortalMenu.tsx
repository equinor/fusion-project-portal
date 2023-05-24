import { Search } from '@equinor/eds-core-react';
import { useAppGroupsQuery, appsMatchingSearch, AppGroup, App } from '@equinor/portal-core';
import { GroupWrapper, LoadingMenu, PortalMenu, CategoryItem } from '@equinor/portal-ui';
import { menuFavoritesController, useAppModule } from '@equinor/portal-core';
import { useState, useMemo } from 'react';
import { useObservable } from '@equinor/portal-utils';
import { combineLatest, map } from 'rxjs';
import styled from 'styled-components';
import { InfoMessage } from 'packages/portal-ui/src/lib/info-message/InfoMessage';

export function MenuGroups() {
	const { data, isLoading } = useAppGroupsQuery();
	const [searchText, setSearchText] = useState<string | undefined>('');
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

	const getColumnCount = () => {
		if (!data) {
			return 1;
		}

		if (data?.length > 3 && data?.length < 10) {
			return 2;
		} else if (data?.length < 3) {
			return 1;
		}
		return 3;
	};

	const getMenuWidth = () => {
		if (!data) {
			return 750;
		}
		if (data?.length > 3 && data?.length < 10) {
			return 1100;
		} else if (data.length < 3) {
			return 750;
		}
		return 1450;
	};

	const customSort = (a: AppGroup, b: AppGroup) => {
		if (a.name === activeItem) {
			return -1;
		} else if (b.name === activeItem) {
			return 1;
		}

		if (a.order < b.order) {
			return -1;
		} else if (a.order > b.order) {
			return 1;
		} else {
			return 0;
		}
	};


	const favoriteGroup = useMemo(() => {
		const favoriteAppKeys = favorites.map((favorites) => favorites.key);
		const enabledApps = (data?.map((group) => group.apps) ?? []).flat();
		const favortiedApps = enabledApps
			.filter((app) => favoriteAppKeys.includes(app.appKey))
			.map(
				(app): App => ({
					appKey: app.appKey,
					description: app.description ?? '',
					name: app.name,
					isDisabled: false,
					order: app.order ?? 0,
				})
			);

		const allAppKeys = enabledApps.map((app) => app.appKey);
		const disabledApps = favorites
			.filter((favorite) => !allAppKeys.includes(favorite.key))
			.map(
				(disabledApp): App => ({
					appKey: disabledApp.key,
					description: disabledApp.description ?? '',
					name: disabledApp.name,
					isDisabled: true,
					order: disabledApp.order ?? 0,
				})
			);

		return {
			name: 'Pinned Apps',
			order: 0,
			accentColor: '#ece90f',
			apps: [...favortiedApps, ...disabledApps],
		};
	}, [favorites, data, []]);

	const displayAppGroups = useMemo(() => {
		if (activeItem.includes('Pinned Apps') && searchText === '') {
			return [favoriteGroup];
		}
		if (searchText != '' || activeItem.includes('All Apps')) {
			const appSearch = appsMatchingSearch(data ?? [], searchText);
			return appSearch.sort(customSort);
		}
		const filteredApps = data?.filter((obj) => obj.name === activeItem);
		return filteredApps;
	}, [searchText, activeItem, []]);

	const handleToggle = (name: string) => {
		if (activeItem === name) {
			setActiveItem('');
		} else {
			setActiveItem(name);
		}
	};

	const AppsWrapper = styled.div`
		padding: 1rem 0 1rem 1rem;
		height: 350px;
		display: block;
		grid-template-columns: auto;
		padding-bottom: 2rem;
		column-width: auto;
		column-count: ${getColumnCount()};
	`;

	const MenyWrapper = styled.div`
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 1rem 0 1rem 0;
		gap: 3rem;
		height: 90%;
	`;

	const CategoryWrapper = styled.div`
		display: flex;
		flex-direction: column;
		padding: 1rem 1rem 1rem 0;
		white-space: nowrap;
		border-right: 1px solid #dcdcdc;
		height: 100%;
		width: 300px;
	`;

	return (
		<PortalMenu width={getMenuWidth()}>
			<Search
				id="app-search"
				placeholder="Search for apps"
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			<MenyWrapper>
				{isLoading ? (
					<LoadingMenu />
				) : (
					<>
						<CategoryWrapper>
							{categoryItems.map((item, index) => (
								<CategoryItem
									key={index}
									name={item}
									isActive={activeItem === item}
									onClick={() => handleToggle(item)}
								/>
							))}
						</CategoryWrapper>
						{displayAppGroups?.length > 0 ? (
							activeItem.includes('Pinned Apps') && favorites?.length === 0 ? (
								<InfoMessage>
									Looks like you do not have any pinned apps yet. Click the star icon on apps to add
									them to the pinned app section.
								</InfoMessage>
							) : (
								<AppsWrapper>
									<GroupWrapper appGroups={displayAppGroups} />
								</AppsWrapper>
							)
						) : (
							<>{searchText ? <InfoMessage>No results found for your search.</InfoMessage> : null}</>
						)}
					</>
				)}
			</MenyWrapper>
		</PortalMenu>
	);
}
