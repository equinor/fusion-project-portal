import { InfoMessage } from '@portal/ui';
import { AppCategory, useFavorites, useTelemetry, getColumnCount } from '@portal/core';
import { AppGroup } from '../app-group/AppGroup';
import styled from 'styled-components';

export const Styles = {
	AppsWrapper: styled.div<{ count: number }>`
		padding: 0 0 1rem 1rem;
		display: block;
		grid-template-columns: auto;
		padding-bottom: 2rem;
		column-width: auto;
		gap: 2rem;
		column-count: ${({ count }) => count};
		overflow: auto;
	`,

	GroupWrapper: styled.div`
		display: flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		width: inherit;
	`,
};

type GroupWrapperProps = {
	appCategories: AppCategory[];
	maxAppsInColumn: number;
};

export const GroupWrapper = ({ appCategories, maxAppsInColumn }: GroupWrapperProps) => {
	const { dispatchEvent } = useTelemetry();
	const { addFavorite } = useFavorites();
	return (
		<Styles.AppsWrapper count={getColumnCount(maxAppsInColumn, appCategories)}>
			<Styles.GroupWrapper>
				{appCategories.length ? (
					appCategories.map((appCategories) => (
						<AppGroup
							dark={false}
							group={appCategories}
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
							}}
							onFavorite={(app) => addFavorite(app.key)}
							key={appCategories.name}
						/>
					))
				) : (
					<InfoMessage>No applications found</InfoMessage>
				)}
			</Styles.GroupWrapper>
		</Styles.AppsWrapper>
	);
};
