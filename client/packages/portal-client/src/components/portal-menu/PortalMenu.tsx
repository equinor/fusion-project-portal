import { Search } from '@equinor/eds-core-react';
import { useAppGroupsQuery, appsMatchingSearch } from '@equinor/portal-core';
import {
	GroupWrapper,
	LoadingMenu,
	PortalMenu,
	StyledCategoryItem,
	StyledMenuWrapper,
	StyledAppsWrapper,
	StyledCategoryWrapper,
} from '@equinor/portal-ui';
import {
	useObservable,
	getMenuWidth,
	getColumnCount,
	customAppgroupArraySort,
	getDisabledApps,
	GetPinnedAppsgroup,
} from '@equinor/portal-utils';
import { combineLatest, map } from 'rxjs';
import { InfoMessage } from 'packages/portal-ui/src/lib/info-message/InfoMessage';
import { menuFavoritesController, useAppModule } from '@equinor/portal-core';
import { useState, useMemo } from 'react';

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
		const disabledApps = getDisabledApps(enabledApps, favorites);
		return GetPinnedAppsgroup(enabledApps, disabledApps, favorites);
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

	const BREAK_COL_2 = 3;
	const BREAK_COL_3 = 10;

	return (
		<PortalMenu width={getMenuWidth(BREAK_COL_2, BREAK_COL_3, data)}>
			<Search
				id="app-search"
				placeholder="Search for apps"
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			<StyledMenuWrapper>
				{isLoading ? (
					<LoadingMenu />
				) : (
					<>
						<StyledCategoryWrapper>
							{categoryItems.map((item, index) => (
								<StyledCategoryItem
									key={index}
									name={item}
									isActive={activeItem === item}
									onClick={() => handleToggle(item)}
								/>
							))}
						</StyledCategoryWrapper>
						{displayAppGroups && !!displayAppGroups?.length ? (
							activeItem.includes('Pinned Apps') && favorites?.length === 0 ? (
								<InfoMessage>
									Looks like you do not have any pinned apps yet. Click the star icon on apps to add
									them to the pinned app section.
								</InfoMessage>
							) : (
								<StyledAppsWrapper count={getColumnCount(BREAK_COL_2, BREAK_COL_3, data)}>
									<GroupWrapper appGroups={displayAppGroups} />
								</StyledAppsWrapper>
							)
						) : (
							<>{searchText ? <InfoMessage>No results found for your search.</InfoMessage> : null}</>
						)}
					</>
				)}
			</StyledMenuWrapper>
		</PortalMenu>
	);
}
