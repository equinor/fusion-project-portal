import { ClientGrid } from '@equinor/workspace-ag-grid';

import { useRef, useState } from 'react';

import { useResizeObserver } from '../../hooks/use-resise-observer';
import { PortalApplication } from '../../types';
import { ActionBar } from './ActionBar';
import { AgStyles } from '../AgStyle';
import { Message } from '../Message';

import { colDefs } from './portalAppsColDef';

import { defaultGridOptions } from '../Ag-Grid/defaultGridOptions';

export const PortalAppTable = ({ portalApps, canEdit }: { portalApps: PortalApplication[]; canEdit?: boolean }) => {
	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);

	const [selectedApps, setSelectedApps] = useState<PortalApplication[]>([]);

	return (
		<AgStyles.Wrapper>
			<AgStyles.TableContent ref={ref}>
				<ClientGrid<PortalApplication>
					{...defaultGridOptions}
					height={selectedApps.length === 0 ? height : height - 150}
					rowData={portalApps || []}
					noRowsOverlayComponent={() => <Message title="No data available" />}
					rowClassRules={{
						notActive: (params) => Boolean(params.data?.doesNotExistInFusion),
						noBuilds: (params) => Boolean(params.data?.appManifest?.build === null),
					}}
					rowSelection="multiple"
					onRowSelected={(event) => {
						const selectedRows = event.api!.getSelectedRows();
						canEdit && setSelectedApps(selectedRows);
					}}
					onRowDataUpdated={() => {
						canEdit && setSelectedApps([]);
					}}
					colDefs={colDefs}
				/>

				{canEdit && <ActionBar selection={selectedApps} />}
			</AgStyles.TableContent>
		</AgStyles.Wrapper>
	);
};
