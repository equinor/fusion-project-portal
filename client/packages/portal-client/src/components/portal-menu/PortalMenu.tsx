import { Search } from '@equinor/eds-core-react';
import { useAppGroupsQuery, appsMatchingSearch } from '@equinor/portal-core';
import { GroupWrapper, LoadingMenu, PortalMenu, CategoryItem } from '@equinor/portal-ui';
import { menuFavoritesController, useAppModule } from '@equinor/portal-core';
import { useState, useMemo } from 'react';
import { useObservable } from '@equinor/portal-utils';
import { combineLatest, map } from 'rxjs';
import styled from 'styled-components';
import { InfoMessage } from 'packages/portal-ui/src/lib/info-message/InfoMessage';

const AppsWrapper = styled.div`
	padding: 1rem 0 1rem 1rem;
	height: 350px;
	display: block;
	grid-template-columns: auto;
	padding-bottom: 2rem;
	column-width: auto;
	column-count: 2;
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

export function MenuGroups() {
	const { data, isLoading } = useAppGroupsQuery();
	const [searchText, setSearchText] = useState<string | undefined>();
	const { fusion } = useAppModule();
	const [activeItem, setActiveItem] = useState('All Apps');

	const favorites = useObservable(
		combineLatest([fusion?.modules?.app?.getAllAppManifests(), menuFavoritesController.favorites$]).pipe(
			map(([apps, favorites]) => apps.filter((app) => favorites.includes(app.key)))
		)
	);

	const categoryItems = ['Pinned Apps', ...(data?.map((item) => item.name) ?? []), 'All Apps'];

	const getPinned = () => {
		if (favorites) {
			const favoriteKeys = favorites?.map((obj) => obj.key.toLowerCase());
			return data
				.map((group) => ({
					...group,
					apps: group.apps.filter((app) => favoriteKeys.includes(app.appKey.toLowerCase())),
				}))
				.filter((group) => group.apps.length);
		}
	};

	const customSort = (a, b) => {
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

	const memoizedResult = useMemo(() => {
		const filteredApps = data?.filter((obj) => obj.name === activeItem);
		if (activeItem.includes('Pinned Apps') && searchText === '') {
			return getPinned();
		}
		if (searchText != '' || activeItem.includes('All Apps')) {
			const appSearch = appsMatchingSearch(data ?? [], searchText);
			return appSearch.sort(customSort);
		}

		return filteredApps;
	}, [searchText, activeItem]);

	const handleToggle = (name: string) => {
		if (activeItem === name) {
			setActiveItem('');
		} else {
			setActiveItem(name);
		}
	};

	return (
		<PortalMenu>
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
						<AppsWrapper>
							{activeItem.includes('Pinned Apps') && favorites?.length === 0 ? (
								<InfoMessage>
									Looks like you do not have any pinned apps yet. Click the star icon on apps to add
									them to the pinned app section.
								</InfoMessage>
							) : null}

							{searchText && memoizedResult?.length === 0 && (
								<InfoMessage>No results found for your search.</InfoMessage>
							)}

							{memoizedResult?.length > 0 ? <GroupWrapper appGroups={memoizedResult} /> : null}
						</AppsWrapper>
					</>
				)}
			</MenyWrapper>
		</PortalMenu>
	);
}
