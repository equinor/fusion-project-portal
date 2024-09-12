import styled from 'styled-components';
import { ClientGrid } from '@equinor/workspace-ag-grid';

import { useEditOnboardContext } from '../../hooks/use-onboarded-context';
import { OnboardedContext } from '../../types';
import { AgStyles } from '../AgStyle';
import { useRef } from 'react';
import { useResizeObserver } from '../../hooks/use-resise-observer';

export function OnboardedContextsTable({ onboardedContexts }: { onboardedContexts?: OnboardedContext[] }) {
	const { mutateAsync } = useEditOnboardContext();

	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);

	return (
		<AgStyles.Wrapper>
			<AgStyles.TableContent ref={ref}>
				<ClientGrid<OnboardedContext>
					height={height}
					rowData={onboardedContexts || []}
					enableCellTextSelection
					ensureDomOrder
					defaultColDef={{
						filter: true,
						flex: 1,
						sortable: true,
						resizable: true,
					}}
					autoSizeStrategy={{
						type: 'fitGridWidth',
						defaultMinWidth: 80,
						defaultMaxWidth: 300,
					}}
					onGridReady={(event) => {
						const api = event.api;
						api.sizeColumnsToFit();
					}}
					onCellValueChanged={(event) => {
						if (event.data) mutateAsync(event.data);
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
						{
							field: 'description',
							headerName: 'Description',
							editable: true,
						},
					]}
				/>
			</AgStyles.TableContent>
		</AgStyles.Wrapper>
	);
}
