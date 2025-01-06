import { ClientGrid } from '@equinor/workspace-ag-grid';

import { useRef, useState } from 'react';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import { ContextType, PortalApplication } from '../../types';
import { ActionBar } from './ActionBar';
import { AgStyles } from '../AgStyle';
import { Message } from '../Message';

const FAIL_MESSAGE = 'Application Error!';

export const PortalAppTable = ({ portalApps, canEdit }: { portalApps: PortalApplication[]; canEdit?: boolean }) => {
	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);

	const [selectedApps, setSelectedApps] = useState<PortalApplication[]>([]);

	return (
		<AgStyles.Wrapper>
			<AgStyles.TableContent ref={ref}>
				<ClientGrid<PortalApplication>
					height={selectedApps.length === 0 ? height : height - 150}
					rowData={portalApps || []}
					noRowsOverlayComponent={() => <Message title="No data available" />}
					enableCellTextSelection
					defaultColDef={{
						filter: true,
						flex: 1,
						sortable: true,
						resizable: true,
					}}
					rowClassRules={{
						notActive: (params) => !Boolean(params.data?.appManifest),
					}}
					ensureDomOrder
					onGridReady={(event) => {
						const api = event.api;
						api.sizeColumnsToFit();
					}}
					rowSelection="multiple"
					rowHeight={36}
					autoSizeStrategy={{
						type: 'fitGridWidth',
						defaultMinWidth: 80,
						defaultMaxWidth: 300,
					}}
					onRowSelected={(event) => {
						const selectedRows = event.api!.getSelectedRows();
						canEdit && setSelectedApps(selectedRows);
					}}
					onRowDataUpdated={() => {
						canEdit && setSelectedApps([]);
					}}
					colDefs={[
						{
							field: 'isActive',
							headerName: 'Status',
							maxWidth: 110,
							cellRenderer: (
								params: CustomCellRendererProps<{
									isActive?: boolean;
									isContextual?: boolean;
									appKey: string;
									appManifest?: { displayName: string };
								}>
							) => {
								if (!params.data?.appManifest) {
									return null;
								}
								return (
									<AgStyles.CellWrapper key={`active-${params.context?.appKey}`}>
										{params.data?.isContextual ? (
											<AgStyles.ContextIndicator
												title={`${params.data?.appManifest?.displayName} is activated with contexts`}
												active={params.data?.isContextual?.toString()}
											/>
										) : (
											<AgStyles.Indicator
												title={`${params.data?.appManifest?.displayName} is active`}
												active={params.data?.isActive?.toString()}
											/>
										)}
									</AgStyles.CellWrapper>
								);
							},
						},
						{
							field: 'isContextual',
							headerName: 'Is Contextual',
							maxWidth: 130,
							hide: true,
							cellRenderer: (
								params: CustomCellRendererProps<{
									isContextual?: boolean;
									appKey: string;
								}>
							) => {
								return (
									<AgStyles.CellWrapper key={`active-${params.context?.appKey}`}>
										<AgStyles.ContextIndicator active={params.data?.isContextual?.toString()} />
									</AgStyles.CellWrapper>
								);
							},
						},
						{
							field: 'appManifest.displayName',
							headerName: 'Name',
							filterParams: {
								filterOptions: ['contains', 'startsWith', 'endsWith'],
								defaultOption: 'startsWith',
							},
							cellRenderer: (
								params: CustomCellRendererProps<{
									appManifest?: { displayName: string };
								}>
							) => {
								return (
									<AgStyles.TextCellWrapperLeft key={`active-${params.context?.appKey}`}>
										{params.data?.appManifest ? params.data?.appManifest.displayName : FAIL_MESSAGE}
									</AgStyles.TextCellWrapperLeft>
								);
							},
						},
						{
							field: 'appKey',
							maxWidth: 350,
							headerName: 'Application key',
							filterParams: {
								filterOptions: ['contains', 'startsWith', 'endsWith'],
								defaultOption: 'startsWith',
							},
						},
						{
							field: 'appManifest.category.displayName',
							maxWidth: 350,
							headerName: 'Category',
							filterParams: {
								filterOptions: ['contains', 'startsWith', 'endsWith'],
								defaultOption: 'startsWith',
							},
							cellRenderer: (
								params: CustomCellRendererProps<{
									appManifest?: { category: { displayName: string } };
								}>
							) => {
								return (
									<AgStyles.TextCellWrapperLeft key={`active-${params.context?.appKey}`}>
										{params.data?.appManifest
											? params.data?.appManifest.category.displayName
											: FAIL_MESSAGE}
									</AgStyles.TextCellWrapperLeft>
								);
							},
						},

						{
							field: 'appManifest',
							headerName: 'Description',
							filterParams: {
								filterOptions: ['contains', 'startsWith', 'endsWith'],
								defaultOption: 'startsWith',
							},
							width: 500,
							valueFormatter: (params) => {
								return params.data?.appManifest
									? params.data?.appManifest.description
									: 'Application Missing application manifest! Application may have been deleted from Fusion app service.';
							},
						},

						{
							field: 'contexts',
							headerName: 'Contexts Types',
							filter: false,
							cellRenderer: (
								params: CustomCellRendererProps<{
									contexts: ContextType[];
									contextTypes: string[];
									appKey: string;
								}>
							) => {
								return (
									<AgStyles.CellWrapper key={`contexts-${params.context?.appKey}`}>
										{params?.data?.contextTypes?.map((type) => {
											return (
												<AgStyles.Chip variant="default" key={type}>
													{type}
												</AgStyles.Chip>
											);
										})}
									</AgStyles.CellWrapper>
								);
							},
						},
					]}
				/>

				{canEdit && <ActionBar selection={selectedApps} />}
			</AgStyles.TableContent>
		</AgStyles.Wrapper>
	);
};
