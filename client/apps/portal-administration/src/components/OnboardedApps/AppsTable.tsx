import { CustomCellRendererProps } from '@ag-grid-community/react';
import { Button, Icon } from '@equinor/eds-core-react';
import { ClientGrid } from '@equinor/workspace-ag-grid';

import { useRef, useState } from 'react';

import { useDeleteOnboardedApp } from '../../hooks/use-onboarded-apps';
import { PortalApp } from '../../types';
import { AppSideSheet } from './AppSideSheet';
import { delete_to_trash, edit } from '@equinor/eds-icons';
import { AgStyles } from '../AgStyle';
import { OnboardedAppsActionBar } from './OnboardedAppsActionBar';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import { Message } from '../Message';

export const AppsTable = ({ onboardedApps }: { onboardedApps: PortalApp[] | undefined }) => {
	const [selectedApp, setSelectedApp] = useState<PortalApp | undefined>();
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
					autoSizeStrategy={{
						type: 'fitGridWidth',
						defaultMinWidth: 80,
						defaultMaxWidth: 300,
					}}
					onGridReady={(event) => {
						const api = event.api;
						api.sizeColumnsToFit();
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
							field: 'name',
							headerName: 'Name',
							filter: true,
						},
						{
							field: 'appKey',
							headerName: 'App Key',
							filter: true,
						},
						{
							field: 'description',
							headerName: 'Description',
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
							headerName: 'Actions',
							cellRenderer: (params: CustomCellRendererProps<PortalApp>) => {
								return (
									<AgStyles.CellWrapper key={params.context?.appKey}>
										<Button
											variant="ghost"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();

												setSelectedApp(params.data);
											}}
										>
											<Icon data={edit} size={16} />
										</Button>
										<Button
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
				<AppSideSheet
					app={selectedApp}
					onClose={() => {
						setSelectedApp(undefined);
					}}
				/>
			</AgStyles.TableContent>
		</AgStyles.Wrapper>
	);
};