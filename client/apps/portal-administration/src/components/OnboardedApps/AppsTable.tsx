import { CustomCellRendererProps } from '@ag-grid-community/react';
import { Button, Icon } from '@equinor/eds-core-react';
import { ClientGrid } from '@equinor/workspace-ag-grid';

import { useRef, useState } from 'react';

import { useDeleteOnboardedApp } from '../../hooks/use-onboarded-apps';
import { PortalApp } from '../../types';

import { delete_to_trash } from '@equinor/eds-icons';
import { AgStyles } from '../AgStyle';
import { OnboardedAppsActionBar } from './OnboardedAppsActionBar';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import { Message } from '../Message';

const FAIL_MESSAGE = 'Application Error!';

export const AppsTable = ({
	onboardedApps,
	canEdit,
}: {
	onboardedApps: PortalApp[] | undefined;
	canEdit?: boolean;
}) => {
	const [selectedApps, setSelectedApps] = useState<PortalApp[]>([]);
	const { mutateAsync: deleteAppByAppKey } = useDeleteOnboardedApp();

	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);

	return (
		<AgStyles.Wrapper>
			<AgStyles.TableContent ref={ref}>
				<ClientGrid<PortalApp>
					height={selectedApps.length === 0 ? height : height - 150}
					rowData={onboardedApps || []}
					noRowsOverlayComponent={() => <Message title="No data available" />}
					rowSelection="multiple"
					rowHeight={36}
					defaultColDef={{
						filter: true,
						flex: 1,
						sortable: true,
						resizable: true,
					}}
					rowClassRules={{
						notActive: (params) => !Boolean(params.data?.displayName || params.data?.description),
					}}
					autoSizeStrategy={{
						type: 'fitGridWidth',
						defaultMinWidth: 80,
						defaultMaxWidth: 700,
					}}
					onGridReady={(event) => {
						const api = event.api;
						api.sizeColumnsToFit();
					}}
					onRowDataUpdated={() => {
						setSelectedApps([]);
					}}
					onRowSelected={(event) => {
						const selectedRows = event.api!.getSelectedRows();
						setSelectedApps(selectedRows);
					}}
					colDefs={[
						{
							field: 'id',
							headerName: 'Id',
							hide: true,
						},
						{
							field: 'displayName',
							headerName: 'Display Name',
							filter: true,
							valueFormatter: (params) => {
								return params.value ? params.value : FAIL_MESSAGE;
							},
						},
						{
							field: 'appKey',
							headerName: 'App Key',
							filter: true,
						},
						{
							field: 'description',
							headerName: 'Description',
							width: 700,
						},

						{
							field: 'contexts',
							headerName: 'Contexts Types',
							filter: true,

							cellRenderer: (
								params: CustomCellRendererProps<{
									contextTypes: string[];
									appKey: string;
								}>
							) => {
								return (
									<AgStyles.CellWrapper key={params.context?.appKey}>
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
						{
							field: 'appKey',
							headerName: 'Action',
							maxWidth: 100,
							resizable: false,
							hide: !canEdit,
							cellRenderer: (params: CustomCellRendererProps<PortalApp>) => {
								return (
									<AgStyles.CellWrapper key={params.context?.appKey}>
										<Button
											title={`Delete ${params.data?.displayName} from system`}
											variant="ghost"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												const appKey = params.data?.appKey;
												appKey && deleteAppByAppKey(appKey);
											}}
										>
											<Icon data={delete_to_trash} size={16} />
										</Button>
									</AgStyles.CellWrapper>
								);
							},
						},
					]}
				/>
				<OnboardedAppsActionBar selection={selectedApps} />
			</AgStyles.TableContent>
		</AgStyles.Wrapper>
	);
};
