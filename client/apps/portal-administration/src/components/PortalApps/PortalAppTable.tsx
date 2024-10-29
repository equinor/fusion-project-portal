import { ClientGrid } from '@equinor/workspace-ag-grid';

import { useRef, useState } from 'react';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import { ContextType, PortalApplication } from '../../types';
import { ActionBar } from './ActionBar';
import { AgStyles } from '../AgStyle';
import { Message } from '../Message';

export const PortalAppTable = ({ portalApps }: { portalApps: PortalApplication[] }) => {
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
						setSelectedApps(selectedRows);
					}}
					onRowDataUpdated={() => {
						setSelectedApps([]);
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
									appManifest: { name: string };
								}>
							) => {
								return (
									<AgStyles.CellWrapper key={`active-${params.context?.appKey}`}>
										{params.data?.isContextual ? (
											<AgStyles.ContextIndicator
												title={`${params.data?.appManifest.name} is activated with contexts`}
												active={params.data?.isContextual?.toString()}
											/>
										) : (
											<AgStyles.Indicator
												title={`${params.data?.appManifest.name} is active`}
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
						},
						{
							field: 'appManifest.appKey',
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
						},

						{
							field: 'appManifest.description',
							headerName: 'Description',
							filterParams: {
								filterOptions: ['contains', 'startsWith', 'endsWith'],
								defaultOption: 'startsWith',
							},
							width: 500,
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

				<ActionBar selection={selectedApps} />
			</AgStyles.TableContent>
		</AgStyles.Wrapper>
	);
};
