import styled from 'styled-components';
import { PortalApp } from '../../types';
import { Typography } from '@equinor/eds-core-react';
import { useAddPortalApps, useRemovePortalApps } from '../../hooks/use-portal-apps';
import { usePortalContext } from '../../context/PortalContext';
import { ContextAppSideSheet } from './ContextAppSideSheet';
import { useState } from 'react';
import { MakeSelectionGlobalButton } from '../Actions/MakeGlobalAppsButton';
import { ActivateSelectedButton } from '../Actions/ActivateSelectedButton';
import { RemoveAppsButton } from '../Actions/RemoveAppsButton';
import { EditSelectedButton } from '../Actions/EditSelectedButton';
import { ActivateSelectedWithContextButton } from '../Actions/ActivateSelectedWithContextButton';

const Styles = {
	Wrapper: styled.div`
		margin-top: 1rem;
		width: 100%;
		height: 100px;
		background-color: #fff;
		position: relative;
		padding-bottom: 2rem;
	`,
	Content: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		height: min-content;
	`,
	Actions: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	Row: styled.div`
		display: flex;
	`,
};

export const ActionBar = ({ selection }: { selection: PortalApp[] }) => {
	const { activePortalId } = usePortalContext();

	const { mutateAsync: activateSelected } = useAddPortalApps(activePortalId);
	const { mutateAsync: removeSelected } = useRemovePortalApps(activePortalId);
	const [isOpen, setIsOpen] = useState(false);

	if (selection.length === 0) return null;
	return (
		<Styles.Wrapper>
			<ContextAppSideSheet
				onClose={() => {
					setIsOpen(false);
				}}
				selection={selection}
				isOpen={isOpen}
			/>
			<Styles.Content>
				<Styles.Actions>
					<Typography variant="overline">Portal Apps Actions</Typography>
					<Styles.Row>
						<ActivateSelectedButton selection={selection} activateSelected={activateSelected} />
						<ActivateSelectedWithContextButton
							selection={selection}
							activateSelectedWithContext={() => setIsOpen(true)}
						/>
						<EditSelectedButton
							editSelection={() => {
								setIsOpen(true);
							}}
							selection={selection}
						/>
						<MakeSelectionGlobalButton selection={selection} makeSelectionGlobal={activateSelected} />
						<RemoveAppsButton selection={selection} removeApps={removeSelected} />
					</Styles.Row>
				</Styles.Actions>
				<Typography variant="overline">Selected applications ({selection.length})</Typography>
			</Styles.Content>
		</Styles.Wrapper>
	);
};
