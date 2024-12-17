import { ClientGrid } from '@equinor/workspace-ag-grid';

import { useMemo, useRef, useState } from 'react';

import { useDeleteOnboardedApp } from '../../hooks/use-onboarded-apps';
import { PortalApp } from '../../types';

import { OnboardedAppsActionBar } from './OnboardedAppsActionBar';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import { Message } from '../Message';
import { AgStyles } from '../AgStyle';
import { appsColDefs } from './appsColDef';
import { defaultGridOptions } from '../Ag-Grid/defaultGridOptions';

export const AppsTable = ({ onboardedApps }: { onboardedApps: PortalApp[] | undefined }) => {
	const [selectedApps, setSelectedApps] = useState<PortalApp[]>([]);
	const { mutateAsync: deleteAppByAppKey } = useDeleteOnboardedApp();

	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);

	const coldDef = useMemo(() => appsColDefs(deleteAppByAppKey), [deleteAppByAppKey]);

	return (
		<AgStyles.Wrapper>
			<AgStyles.TableContent ref={ref}>
				<ClientGrid<PortalApp>
					height={selectedApps.length === 0 ? height : height - 150}
					{...defaultGridOptions}
					rowData={onboardedApps || []}
					noRowsOverlayComponent={() => <Message title="No data available" />}
					rowSelection="multiple"
					rowClassRules={{
						notActive: (params) => !Boolean(params.data?.displayName || params.data?.description),
					}}
					onRowDataUpdated={() => {
						setSelectedApps([]);
					}}
					onRowSelected={(event) => {
						const selectedRows = event.api!.getSelectedRows();
						setSelectedApps(selectedRows);
					}}
					colDefs={coldDef}
				/>
				<OnboardedAppsActionBar selection={selectedApps} />
			</AgStyles.TableContent>
		</AgStyles.Wrapper>
	);
};
