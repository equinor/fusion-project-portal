import { getColumnCount } from '@portal/utils';
import { InfoMessage } from '@portal/ui';
import { AppCategory, useFavorites } from '@portal/core';
import { AppGroup } from '../app-group/AppGroup';
import styled from 'styled-components';
import { useTelemetry } from '@equinor/portal-core';

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
	appGroups: AppCategory[];
	maxAppsInColumn: number;
};

export const GroupWrapper = ({ appGroups, maxAppsInColumn }: GroupWrapperProps) => {
	const { dispatchEvent } = useTelemetry();
	const { addFavorite } = useFavorites();
	return (
		<Styles.AppsWrapper count={getColumnCount(maxAppsInColumn, appGroups)}>
			<Styles.GroupWrapper>
				{appGroups.length ? (
					appGroups.map((appGroup) => (
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
							}}
							onFavorite={(app) => addFavorite(app.key)}
							key={appGroup.name}
						/>
					))
				) : (
					<InfoMessage>No applications found</InfoMessage>
				)}
			</Styles.GroupWrapper>
		</Styles.AppsWrapper>
	);
};
