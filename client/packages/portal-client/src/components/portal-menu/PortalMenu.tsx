import { Search } from '@equinor/eds-core-react';
import { useAppGroupsQuery, appsMatchingSearch, AppGroup, App } from '@equinor/portal-core';
import { GroupWrapper, LoadingMenu, PortalMenu, CategoryItem, MenuWrapper, AppsWrapper, CategoryWrapper } from '@equinor/portal-ui';
import { menuFavoritesController, useAppModule } from '@equinor/portal-core';
import { useState, useMemo } from 'react';
import { useObservable, getMenuWidth, getColumnCount, customAppgroupArraySort } from '@equinor/portal-utils';
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

	const favoriteGroup = useMemo(() => {
		const enabledApps = (data?.map((group) => group.apps) ?? []).flat();
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

		return favorites.reduce(
			(acc, curr) => {
				const enabledApp =
					enabledApps.find((app) => app.appKey === curr.key) ??
					disabledApps.find((app) => app.appKey === curr.key);
				if (enabledApp) {
					return {
						...acc,
						apps: [...acc.apps, enabledApp],
					};
				}
				return acc;
			},
			{
				name: 'Pinned Apps',
				order: 0,
				accentColor: '#ece90f',
				apps: [],
			} as AppGroup
		);
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

	return (
		<PortalMenu width={getMenuWidth(data)}>
			<Search
				id="app-search"
				placeholder="Search for apps"
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			<MenuWrapper>
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
						{displayAppGroups && !!displayAppGroups?.length ? (
							activeItem.includes('Pinned Apps') && favorites?.length === 0 ? (
								<InfoMessage>
									Looks like you do not have any pinned apps yet. Click the star icon on apps to add
									them to the pinned app section.
								</InfoMessage>
							) : (
								<AppsWrapper count={getColumnCount(data)}>
									<GroupWrapper appGroups={displayAppGroups} />
								</AppsWrapper>
							)
						) : (
							<>{searchText ? <InfoMessage>No results found for your search.</InfoMessage> : null}</>
						)}
					</>
				)}
			</MenuWrapper>
		</PortalMenu>
	);
}