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
	flex-direction: row;
	padding: 1rem 1rem 1rem 0;
	display: inline-block;
	white-space: nowrap;
	border-right: 1px solid #dcdcdc;
	height: 100%;
	width: 30%;
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
		if (activeItem == name) {
			setClickedCategoryItems([]);
		} else if (name === 'All Apps') {
			const filteredItems = categoryItems.filter((item) => item !== 'Pinned Apps');
			setClickedCategoryItems(filteredItems);
		} else {
			setClickedCategoryItems([name]);
		}
		setActiveItem((prevItem) => (prevItem === name ? '' : name));
	};

	const categoryItems = ['Pinned Apps', 'All Apps'];

	if (!isLoading && data != null) {
		data.map((item) => {
			categoryItems.push(item.name);
		});
	}

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
							{clickedCategoryItems.includes('Pinned Apps') && (
								<>
									{appsMatchingSearchByFav(data ?? [], searchText, favorites).length < 1 &&
									!searchText ? (
										<InfoMessage>
											Looks like you do not have any pinned apps yet. Clik the star icon on apps
											to add them to the pinned app section.
										</InfoMessage>
									) : (
										<GroupWrapper
											appGroups={appsMatchingSearchByFav(data ?? [], searchText, favorites)}
										/>
									)}
								</>
							)}

							{clickedCategoryItems.filter((item) => item !== 'All Apps' && item !== 'Pinned Apps')
								.length > 0 && (
								<>
									<GroupWrapper
										appGroups={appsMatchingSearchByCat(
											data ?? [],
											searchText,
											clickedCategoryItems
										)}
									/>
								</>
							)}
							{searchText && !clickedCategoryItems.includes('All Apps') && (
								<>
									<GroupWrapper
										appGroups={appsMatchingSearch(data ?? [], searchText, clickedCategoryItems)}
									/>
								</>
							)}
						</AppsWrapper>
					</>
				)}
			</MenyWrapper>
		</PortalMenu>
	);
}
