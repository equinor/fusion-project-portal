import { ClientGrid } from '@equinor/workspace-ag-grid';

import { AgStyles } from '../AgStyle';
import { useRef } from 'react';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { Button, Icon } from '@equinor/eds-core-react';
import { delete_to_trash } from '@equinor/eds-icons';
import { useRemoveContextType } from '../../hooks/use-context-type-query';

export function ContextTypeTable({ contextTypes, isAdmin }: { contextTypes?: { type: string }[]; isAdmin?: boolean }) {
	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);
	const { mutateAsync: removeContextType } = useRemoveContextType();
	return (
		<AgStyles.Wrapper>
			<AgStyles.TableContent ref={ref}>
				<ClientGrid<{ type: string }>
					height={height}
					rowData={contextTypes || []}
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
					onGridSizeChanged={(event) => {
						const api = event.api;
						api.sizeColumnsToFit();
					}}
					colDefs={[
						{
							field: 'type',
							headerName: 'Type',
						},
						{
							field: 'type',
							headerName: 'Action',
							maxWidth: 120,
							hide: !isAdmin,
							cellRenderer: (params: CustomCellRendererProps<{ type: string }>) => {
								return (
									<AgStyles.CellWrapper>
										<Button
											variant="ghost"
											title={`Delete ${params.data?.type}`}
											disabled={!isAdmin}
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												removeContextType(params.data?.type || '');
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
			</AgStyles.TableContent>
		</AgStyles.Wrapper>
	);
}
