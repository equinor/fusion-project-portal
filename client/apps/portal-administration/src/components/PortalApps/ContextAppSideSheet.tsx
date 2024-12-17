import { Card, Typography, Button } from '@equinor/eds-core-react';

import SideSheet from '@equinor/fusion-react-side-sheet';
import styled from 'styled-components';
import { OnboardedContext, PortalApplication } from '../../types';

import { ClientGrid } from '@equinor/workspace-ag-grid';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useActiveOnboardedContext } from '../../hooks/use-active-onbaorded-context';
import { Message } from '../Message';
import { useGetPortalApp } from '../../hooks/use-portal-apps';

import { usePortalContext } from '../../context/PortalContext';
import { useAddAppWithContexts, useRemoveAppWithContexts } from '../../hooks/use-add-app-with-context';
import { useQueryClient } from '@tanstack/react-query';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import { AgStyles } from '../AgStyle';
import { AddContext } from '../OnboardedContexts/AddContext';
import { Loading } from '../Loading';

const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-left: 0.5rem;
		height: calc(100% - 10rem);
	`,
	PadTop: styled(Typography)`
		padding-bottom: 0.2rem;
	`,
	Card: styled(Card)<{ col?: number }>`
		box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2), 0px 2px 4px -2px rgba(16, 24, 40, 0.2);
		width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 3rem)`};
	`,
	Actions: styled.div`
		position: absolute;
		bottom: -1rem;
		display: flex;
		flex-direction: column;
		height: 100px;
		gap: 1rem;
	`,
	Row: styled.div`
		display: flex;

		gap: 1rem;
	`,
	TableContent: styled.div`
		padding-top: 1rem;
		position: relative;
		height: 100%;
		width: 100%;
	`,
	AddContext: styled.div`
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;

		z-index: 9;
		box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
	`,
};

export function ContextAppSideSheet({
	app,
	isOpen,
	onClose,
}: {
	app: PortalApplication;
	isOpen: boolean;
	onClose: VoidFunction;
}) {
	const { activePortalId } = usePortalContext();
	const { mutate: add } = useAddAppWithContexts(activePortalId);
	const { mutate: remove } = useRemoveAppWithContexts(activePortalId);
	const { activeContexts, contextTypes } = useActiveOnboardedContext();
	const [selectedContexts, setSelectedContexts] = useState<OnboardedContext[]>([]);

	const { data: activeApp, isLoading } = useGetPortalApp(activePortalId, app.appManifest.appKey);

	const contexts: OnboardedContext[] = useMemo(() => {
		if (!activeApp || !activeContexts) return [];
		return activeContexts.map((context) => ({
			...context,
			isActive: activeApp.contextIds?.includes(context.contextId),
		}));
	}, [activeContexts, activeApp]);

	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);

	if (!contexts) return null;

	return (
		<SideSheet
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
			minWidth={1200}
			isDismissable={true}
		>
			<SideSheet.Title title={`Activate ${app.appManifest.displayName} Application`} />
			<SideSheet.SubTitle subTitle="Activate application with contexts" />
			<SideSheet.Actions></SideSheet.Actions>
			<SideSheet.Content>
				<div style={{ position: 'relative', height: '60px' }}>
					<Style.AddContext>
						<AddContext />
					</Style.AddContext>
				</div>
				<Style.Wrapper>
					<AgStyles.Wrapper>
						<Style.TableContent ref={ref}>
							{isLoading ? (
								<Loading detail="Loading Application Data" />
							) : (
								<ClientGrid<OnboardedContext>
									height={height}
									rowData={contexts}
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
									defaultColDef={{
										filter: true,
										flex: 1,
										sortable: true,
										resizable: true,
									}}
									ensureDomOrder
									onGridReady={(event) => {
										const api = event.api;
										api.sizeColumnsToFit();
									}}
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
											field: 'isActive',
											headerName: 'Active',
											maxWidth: 100,
											editable: true,
											onCellValueChanged: (event) => {
												if (event.newValue) {
													console.log('Activate context', event.data);
													add({
														appKey: app.appManifest.appKey,
														contextIds: [event.data.contextId],
													});
												} else {
													remove({
														appKey: app.appManifest.appKey,
														contextIds: [event.data.contextId],
													});
												}
											},
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
							)}
						</Style.TableContent>
					</AgStyles.Wrapper>

					<Style.Actions>
						<Style.PadTop variant="overline">Activate Application With Context Actions</Style.PadTop>
						<Style.Row>
							{selectedContexts?.filter((a) => !a.isActive).length > 0 && (
								<Button
									onClick={() => {
										add({
											appKey: app.appManifest.appKey,
											contextIds: selectedContexts
												.filter((a) => !a.isActive)
												.map((a) => a.contextId),
										});
									}}
								>
									Activate selected
								</Button>
							)}
							{selectedContexts?.filter((a) => a.isActive).length > 0 && (
								<Button
									onClick={() => {
										remove({
											appKey: app.appManifest.appKey,
											contextIds: selectedContexts
												.filter((a) => a.isActive)
												.map((a) => a.contextId),
										});
									}}
								>
									Remove Selected
								</Button>
							)}
						</Style.Row>
					</Style.Actions>
				</Style.Wrapper>
			</SideSheet.Content>
		</SideSheet>
	);
}
