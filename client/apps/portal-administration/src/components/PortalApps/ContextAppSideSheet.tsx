import { Card, Typography, Button } from '@equinor/eds-core-react';

import SideSheet from '@equinor/fusion-react-side-sheet';
import styled from 'styled-components';
import { OnboardedContext, PortalApp } from '../../types';

import { ClientGrid } from '@equinor/workspace-ag-grid';
import { useState } from 'react';
import { useActiveOnboardedContext } from '../../hooks/use-active-onbaorded-context';
import { Message } from '../Message';
import { Link } from 'react-router-dom';

const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	PadTop: styled(Typography)`
		padding-bottom: 0.2rem;
	`,
	Card: styled(Card)<{ col?: number }>`
		box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2), 0px 2px 4px -2px rgba(16, 24, 40, 0.2);
		width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 3rem)`};
	`,
};

export function ContextAppSideSheet({
	selection,
	isOpen,
	onClose,
}: {
	selection: PortalApp[];
	isOpen: boolean;
	onClose: VoidFunction;
}) {
	const { isLoading, activeContexts, contextTypes } = useActiveOnboardedContext();
	const [contexts, setSelectedContexts] = useState<OnboardedContext[] | undefined>();
	if (!selection) return null;
	return (
		<SideSheet
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
			minWidth={600}
			isDismissable={true}
		>
			<SideSheet.Title title="Activate selected apps" />
			<SideSheet.SubTitle subTitle="Edit onboarded application information" />
			<SideSheet.Actions></SideSheet.Actions>
			<SideSheet.Content>
				<Style.Wrapper>
					<Typography variant="h6">Selected Apps ({selection.length})</Typography>
					<Typography>{selection.map((app) => app.name).join(' | ')}</Typography>
					<Style.PadTop variant="h6">Contexts</Style.PadTop>
					<Button variant="outlined" as={Link} to={'/settings/context?tab=new'}>
						Add Contexts
					</Button>
					<ClientGrid<OnboardedContext>
						height={900}
						rowData={activeContexts}
						enableCellTextSelection
						ensureDomOrder
						rowSelection="multiple"
						rowHeight={36}
						onRowSelected={(event) => {
							const selectedRows = event.api!.getSelectedRows();

							setSelectedContexts(selectedRows);
						}}
						noRowsOverlayComponent={() => (
							<Message
								type="NoContent"
								title={`No contexts matching ${contextTypes?.join(' | ')}`}
								messages={['If context is not present use add context']}
							/>
						)}
						autoSizeStrategy={{
							type: 'fitGridWidth',
							defaultMinWidth: 80,
							defaultMaxWidth: 300,
						}}
						colDefs={[
							{
								field: 'id',
								headerName: 'Id',
								hide: true,
							},
							{
								field: 'title',
								headerName: 'Title',
							},
							{
								field: 'contextId',
								headerName: 'Context Id',
							},
							{
								field: 'externalId',
								headerName: 'External Context Id',
							},
							{
								field: 'type',
								headerName: 'Context Type',
							},
						]}
					/>

					<Button>Activate apps with selected contexts</Button>
				</Style.Wrapper>
			</SideSheet.Content>
		</SideSheet>
	);
}
