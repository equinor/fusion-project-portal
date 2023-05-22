import { Search } from '@equinor/eds-core-react';
import {
	useAppGroupsQuery,
	appsMatchingSearch,
	appsMatchingSearchByCat,
	appsMatchingSearchByFav,
} from '@equinor/portal-core';
import { GroupWrapper, LoadingMenu, PortalMenu, CategoryItem } from '@equinor/portal-ui';
import { menuFavoritesController, useAppModule } from '@equinor/portal-core';
import { useState } from 'react';
import { useObservable } from '@equinor/portal-utils';
import { combineLatest, map } from 'rxjs';
import styled from 'styled-components';
import { InfoMessage } from 'packages/portal-ui/src/lib/info-message/InfoMessage';

const AppsWrapper = styled.div`
	padding: 1rem 0 1rem 1rem;
	width: 70%;
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
	const [clickedCategoryItems, setClickedCategoryItems] = useState<string[]>([]);
	const [activeItem, setActiveItem] = useState('');
	const favorites = useObservable(
		combineLatest([fusion?.modules?.app?.getAllAppManifests(), menuFavoritesController.favorites$]).pipe(
			map(([apps, favorites]) => apps.filter((app) => favorites.includes(app.key)))
		)
	);

	const handleToggle = (name: string) => {
		if (activeItem === name) {
			setClickedCategoryItems([]);
			setActiveItem('');
		} else if (name === 'All Apps') {
			const filteredItems = categoryItems.filter((item) => item !== 'Pinned Apps');
			setClickedCategoryItems(filteredItems);
			setActiveItem(name);
		} else {
			setClickedCategoryItems([name]);
			setActiveItem(name);
		}
	};

	const categoryItems = ['Pinned Apps', 'All Apps', ...(data?.map((item) => item.name) ?? [])];

	const searchResultsOther = appsMatchingSearch(data ?? [], searchText, clickedCategoryItems, favorites);
	const searchResultsSelected = appsMatchingSearchByCat(data ?? [], searchText, clickedCategoryItems);
	const searchResultsPinned = appsMatchingSearchByFav(data ?? [], searchText, favorites);

	const searchHits = searchResultsOther.length + searchResultsSelected.length + searchResultsPinned.length;

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
							{clickedCategoryItems.includes('Pinned Apps') && favorites?.length === 0 ? (
								<InfoMessage>
									Looks like you do not have any pinned apps yet. Click the star icon on apps to add
									them to the pinned app section.
								</InfoMessage>
							) : null}
							{clickedCategoryItems.includes('Pinned Apps') && searchResultsPinned.length > 0 ? (
								<>
									<GroupWrapper appGroups={searchResultsPinned} />
								</>
							) : null}

							{clickedCategoryItems.filter((item) => item !== 'All Apps' && item !== 'Pinned Apps')
								.length > 0 && searchResultsSelected.length > 0 ? (
								<GroupWrapper appGroups={searchResultsSelected} />
							) : null}

							{searchText &&
							!clickedCategoryItems.includes('All Apps') &&
							searchResultsOther.length > 0 ? (
								<GroupWrapper appGroups={searchResultsOther} />
							) : null}

							{searchHits === 0 && <InfoMessage>No results found for your search.</InfoMessage>}
						</AppsWrapper>
					</>
				)}
			</MenyWrapper>
		</PortalMenu>
	);
}
