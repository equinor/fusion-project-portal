import { ClientGrid } from '@equinor/workspace-ag-grid';
import { Portal } from '../../types';
import { Link } from 'react-router-dom';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { edit, delete_to_trash, apps, tag_relations, assignment } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import * as AllIcons from '@equinor/eds-icons';
import { useDeletePortal } from '../../hooks/use-portal-query';
import { DeleteDialog } from '../Dialogue/DeleteDialog';
import { PortalSideSheet } from './PortalSideSheet';
import { AgStyles } from '../AgStyle';
import { Message } from '../Message';
import { usePortalContext } from '../../context/PortalContext';

export function PortalTable({ portalsData }: { portalsData?: Portal[] }) {
	const { mutateAsync: deletePortal } = useDeletePortal();
	const { setActivePortalById, activePortalId } = usePortalContext();

	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);

	const [isDeleting, setIsDeleting] = useState<Portal | undefined>();
	const [quickEdit, setQuickEdit] = useState<Portal | undefined>();

	return (
		<AgStyles.Wrapper>
			<AgStyles.TableContent ref={ref}>
				<ClientGrid<Portal>
					height={height}
					rowData={portalsData || []}
					noRowsOverlayComponent={() => <Message title="No data available" />}
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
					colDefs={[
						{
							field: 'id',
							headerName: 'Id',
							hide: true,
						},
						{
							field: 'icon',
							headerName: 'Icon',
							maxWidth: 70,
							cellRenderer: (
								params: CustomCellRendererProps<{
									icon: string;
									id: string;
								}>
							) => {
								if (!params.data?.icon) {
									return null;
								}
								return (
									<AgStyles.CellWrapper key={params.data?.id}>
										{params.data?.icon && Object.keys(AllIcons).includes(params.data?.icon) ? (
											<Icon name={params.data?.icon} size={24} />
										) : (
											<AgStyles.Icon
												dangerouslySetInnerHTML={{
													__html: params.data?.icon.replace(/\s+/g, ' ').trim(),
												}}
											/>
										)}
									</AgStyles.CellWrapper>
								);
							},
						},
						{
							field: 'name',
							headerName: 'Name',
							cellRenderer: (
								params: CustomCellRendererProps<{
									name: string;
									id: string;
								}>
							) => {
								return (
									<AgStyles.TextCellWrapper key={params.data?.id}>
										<Typography
											as={Link}
											to={`/portals/${params.data?.id}/overview`}
											variant="body_short"
										>
											{params.data?.name}
										</Typography>
									</AgStyles.TextCellWrapper>
								);
							},
						},
						{
							field: 'subtext',
							headerName: 'Sub Text',
							hide: true,
						},
						{
							field: 'shortName',
							headerName: 'Short Name',
							hide: true,
						},
						{
							field: 'description',
							headerName: 'Description',
						},
						{
							field: 'contexts',
							headerName: 'Contexts Types',

							cellRenderer: (
								params: CustomCellRendererProps<{
									contextTypes: string[];
									id: string;
								}>
							) => {
								return (
									<AgStyles.CellWrapper key={params.context?.id}>
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
							field: 'id',
							headerName: 'Actions',
							maxWidth: 300,
							cellRenderer: (params: CustomCellRendererProps<Portal>) => {
								return (
									<AgStyles.CellWrapper>
										<Button
											variant="ghost"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												setQuickEdit(params.data);
											}}
										>
											<Icon data={assignment} size={16} />
										</Button>
										<Button
											title="Portal configuration overview"
											as={Link}
											to={`/portals/${params.data?.id}/overview`}
											variant="ghost"
											onClick={(e) => {
												e.stopPropagation();
												setActivePortalById(params.data?.id);
											}}
										>
											<Icon data={edit} size={16} />
										</Button>
										<Button
											title="Apps configuration"
											variant="ghost"
											as={Link}
											to={`/portals/${params.data?.id}/apps`}
											onClick={(e) => {
												e.stopPropagation();
												setActivePortalById(params.data?.id);
											}}
										>
											<Icon data={apps} size={16} />
										</Button>
										<Button
											title="Apps configuration"
											variant="ghost"
											as={Link}
											to={`/portals/${params.data?.id}/router`}
											onClick={(e) => {
												e.stopPropagation();
												setActivePortalById(params.data?.id);
											}}
										>
											<Icon data={tag_relations} size={16} />
										</Button>
										<Button
											variant="ghost"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												setIsDeleting(params.data);
												setActivePortalById(params.data?.id);
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
				<DeleteDialog
					type="Portal"
					open={Boolean(isDeleting)}
					onClose={() => setIsDeleting(undefined)}
					onDelete={() => {
						deletePortal(isDeleting);
						setIsDeleting(undefined);
					}}
					title={isDeleting?.name || 'Portal'}
				></DeleteDialog>
				<PortalSideSheet portal={quickEdit} onClose={() => setQuickEdit(undefined)} />
			</AgStyles.TableContent>
		</AgStyles.Wrapper>
	);
}
