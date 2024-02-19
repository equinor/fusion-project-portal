import { Button, Checkbox, Icon, Typography } from '@equinor/eds-core-react';

import { PersonDetails } from '@portal/types';
import { arrow_back } from '@equinor/eds-icons';

import { useState, useEffect } from 'react';
import { useTopBarActions, PortalAction, usePortalActions } from '@equinor/portal-core';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { ActionItem } from './ActionItem';

export const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem, 1rem;
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
	Role: styled.div`
		display: flex;
		flex-direction: row;
		padding: 0.5rem;
		justify-content: space-between;
		border: 1px solid grey;
		border-radius: 4px;
		margin-left: 0.5rem;
	`,
	RoleTop: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	`,
	Indicator: styled.div<{ isActive: boolean; hasError?: boolean }>`
		height: 40px;
		width: 0.5rem;
		background-color: ${({ isActive, hasError }) =>
			hasError
				? tokens.colors.interactive.danger__resting.hex
				: isActive
				? tokens.colors.interactive.primary__resting.hex
				: tokens.colors.interactive.disabled__text.hex};
	`,
	NoContent: styled.div`
		height: 50vh;
	`,
};

export const PortalSettingsTab = ({ onClick }: { onClick: VoidFunction; user?: PersonDetails }) => {
	const { toggleTopBarAllActions, topBarActions$, toggleActionById } = useTopBarActions();
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
		</Style.Wrapper>
	);
};
