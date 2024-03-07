import { Search, Switch } from '@equinor/eds-core-react';
import { InfoMessage, MenuScrim, StyledCategoryItem } from '@equinor/portal-ui';
import { appGroupArraySort, getDisabledApps, getPinnedAppsGroup, usePortalMenu, useTelemetry } from '@portal/core';

import { appsMatchingSearch, usePortalApps } from '@portal/core';
import { useState, useMemo } from 'react';
import { useFeature } from '@equinor/fusion-framework-react-app/feature-flag';
import { useFavorites } from '@portal/core';
import styled from 'styled-components';
import { AppGroup, LoadingMenu } from '@portal/components';

const Styles = {
	Divider: styled.div`
		border-right: 1px solid #dcdcdc;
		height: 90%;
	`,
	CategoryWrapper: styled.div`
		display: flex;
		flex-direction: column;
		padding-bottom: 2rem;
		white-space: nowrap;
		max-height: 100%;
		width: 300px;
		gap: 1rem;
	`,

	MenuWrapper: styled.div`
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 1rem 0 1rem 0;
		gap: 1rem;
		height: 90%;
		padding-top: 2rem;
	`,

	Wrapper: styled.div`
		column-count: 3;
		height: 100%;

		gap: 1.5rem;
		overflow: auto;
		@media only screen and (max-width: 1500px) {
			column-count: 2;
			display: flex;
			flex-wrap: wrap;
		}
		@media only screen and (max-width: 1300px) {
			column-count: 0;
			display: flex;
			flex-wrap: wrap;
			> * {
				flex: 1;
			}
		}
	`,
	Feature: styled.div`
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	`,
};

export function MenuGroups() {
	const { dispatchEvent } = useTelemetry();
	const { appCategories, isLoading } = usePortalApps();
	const { searchText, closeMenu, setSearchText } = usePortalMenu();
	const [activeItem, setActiveItem] = useState('All Apps');

	const { feature, toggleFeature } = useFeature('new-menu');
	const { addFavorite, appGroups, favorites } = useFavorites();

	const categoryItems = ['Pinned Apps', ...(appCategories?.map((item) => item.name) ?? []), 'All Apps'];

	const favoriteGroup = useMemo(() => {
		const enabledApps = (appGroups?.map((group) => group.apps) ?? []).flat();
		const disabledApps = getDisabledApps(enabledApps, favorites);
		return getPinnedAppsGroup(enabledApps, disabledApps, favorites);
	}, [favorites, appGroups]);

	const displayAppGroups = useMemo(() => {
		if (activeItem.includes('Pinned Apps') && searchText === '') {
			return [favoriteGroup];
		}
		if (activeItem.includes('All Apps') || searchText != '') {
			const appSearch = appsMatchingSearch(appGroups ?? [], searchText);
			return appSearch.sort(appGroupArraySort);
		}
		const filteredApps = appGroups?.filter((obj) => obj.name === activeItem);
		return filteredApps;
	}, [searchText, activeItem, appGroups, favoriteGroup]);

	const hasApps = useMemo(() => Boolean(appCategories && appCategories.length !== 0), [appCategories]);

	const handleToggle = (name: string | null) => {
		if (activeItem === name) {
			setActiveItem('All Apps');
		} else {
			name && setActiveItem(name);
		}
	};

	return (
		<MenuScrim>
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

			<Styles.MenuWrapper>
				{isLoading ? (
					<LoadingMenu />
				) : (
					<>
						<Styles.Divider>
							<Styles.CategoryWrapper>
								{categoryItems.map((item, index) => (
									<StyledCategoryItem
										key={index}
										name={item || ''}
										isActive={activeItem === item}
										onClick={() => handleToggle(item)}
									/>
								))}
							</Styles.CategoryWrapper>
							{/* Todo: remove when decided to use new menu */}
							<Styles.Feature>
								<Switch
									title="Toggle New Menu Feature"
									checked={feature?.enabled}
									disabled={feature?.readonly}
									onChange={() => toggleFeature()}
								/>
							</Styles.Feature>
						</Styles.Divider>
						{displayAppGroups && !!displayAppGroups?.length ? (
							activeItem.includes('Pinned Apps') && favorites?.length === 0 ? (
								<InfoMessage>
									Looks like you do not have any pinned apps yet. <br /> Click the star icon on apps
									to add them to the pinned app section.
								</InfoMessage>
							) : (
								<Styles.Wrapper>
									{displayAppGroups &&
										displayAppGroups.map((appGroup) => (
											<div key={appGroup.name}>
												<AppGroup
													dark={false}
													group={appGroup}
													onClick={(app, e) => {
														if (app.isDisabled) {
															e.preventDefault();
															return;
														}
														dispatchEvent(
															{
																name: 'onAppNavigation',
															},

															{
																appKey: app.key,
																isFavorite: app.isPinned,
																source: 'app-menu',
															}
														);

														closeMenu();
													}}
													onFavorite={(app) => addFavorite(app.key)}
												/>
											</div>
										))}
								</Styles.Wrapper>
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
			</Styles.MenuWrapper>
		</MenuScrim>
	);
}
