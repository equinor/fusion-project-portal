import { Button, Checkbox, Icon, Typography } from '@equinor/eds-core-react';

import { PersonDetails } from '@portal/types';
import { arrow_back } from '@equinor/eds-icons';

import { useState, useEffect } from 'react';
import { useTopBarActions, PortalAction, usePortalActions } from '@equinor/portal-core';
import styled from 'styled-components';
import { ActionItem } from './ActionItem';

export const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem, 1rem;
	`,
	Content: styled.div`
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
	`,
	Item: styled.div`
		min-width: 250px;
		padding-left: 0.5rem;
	`,
	TopWrapper: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem, 0;
		align-items: center;
	`,
};

export const PortalSettingsTab = ({ onClick }: { onClick: VoidFunction; user?: PersonDetails }) => {
	const { toggleTopBarAllActions, topBarActions$ } = useTopBarActions();
	const [actions, setActions] = useState<PortalAction[]>([]);
	const [favorites, setFavorites] = useState<PortalAction[]>([]);

	const [allActionsChecked, setAllActionsChecked] = useState<boolean>(false);
	const { actions$ } = usePortalActions();

	useEffect(() => {
		const actionsSubscription = actions$.subscribe(setActions);
		return () => {
			actionsSubscription.unsubscribe();
		};
	}, [actions$]);

	useEffect(() => {
		const topBarActionsSubscription = topBarActions$.subscribe((topBarActions) => {
			setAllActionsChecked(topBarActions.length === actions$.value.filter((a) => !a.hidden).length);
			setFavorites(topBarActions);
		});
		return () => {
			topBarActionsSubscription.unsubscribe();
		};
	}, [actions$, topBarActions$]);

	return (
		<Style.Wrapper>
			<Style.TopWrapper>
				<Button variant="ghost_icon" onClick={onClick} role="button">
					<Icon data={arrow_back} />
				</Button>

				<Typography>Portal Settings</Typography>
			</Style.TopWrapper>
			<Style.Content>
				<Typography variant="h6">Extensions</Typography>
				<Typography>Enable or disable extensions in the top bar using the checkboxes below.</Typography>
				<div>
					{actions.map((action) => (
						<Style.Item key={action.actionId}>
							<ActionItem action={action} isFavorite={favorites.includes(action)} />
						</Style.Item>
					))}
				</div>
				<Typography variant="h6">Toggle All Extensions</Typography>
				<Typography>Enable or disable all extensions in the top bar using the checkbox below.</Typography>
				<Style.Item>
					<Checkbox
						onChange={() => {
							toggleTopBarAllActions();
						}}
						checked={allActionsChecked}
						label=" Show extensions in top bar"
					/>
				</Style.Item>
			</Style.Content>
		</Style.Wrapper>
	);
};
