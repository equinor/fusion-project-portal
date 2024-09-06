import styled from 'styled-components';
import { ClientGrid } from '@equinor/workspace-ag-grid';
import { Portal } from '../../types';
import { useNavigate } from 'react-router-dom';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { Button, Chip, Icon } from '@equinor/eds-core-react';
import { edit, delete_to_trash, list } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import * as AllIcons from '@equinor/eds-icons';
import { useDeletePortal } from '../../hooks/use-portal-query';
import { DeleteDialog } from '../Dialogue/DeleteDialog';
import { PortalSideSheet } from './PortalSideSheet';
import { AgStyle } from '../AgStyle';
const Styles = {
	CellWrapper: styled.div`
		display: flex;
		justify-content: flex-end;
	`,
	Chip: styled(Chip)`
		margin-top: 0.5rem;
	`,
	TableContent: styled.div`
		position: relative;
		width: calc(100% - 2rem);
		height: 100%;
	`,

	Icon: styled.span`
		> svg {
			width: 25px;
		}
	`,
};

export function PortalTable({ portalsData }: { portalsData?: Portal[] }) {
	const navigate = useNavigate();
	const { mutateAsync: deletePortal } = useDeletePortal();

	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);

	const [isDeleting, setIsDeleting] = useState<Portal | undefined>();
	const [quickEdit, setQuickEdit] = useState<Portal | undefined>();

	return (
		<AgStyle>
			<Styles.TableContent ref={ref}>
				<ClientGrid<Portal>
					height={height - 160}
					rowData={portalsData || []}
					enableCellTextSelection
					ensureDomOrder
					rowHeight={36}
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
									<Styles.CellWrapper key={params.data?.id}>
										{params.data?.icon && Object.keys(AllIcons).includes(params.data?.icon) ? (
											<Icon name={params.data?.icon} size={24} />
										) : (
											<Styles.Icon
												dangerouslySetInnerHTML={{
													__html: params.data?.icon.replace(/\s+/g, ' ').trim(),
												}}
											/>
										)}
									</Styles.CellWrapper>
								);
							},
						},
						{
							field: 'name',
							headerName: 'Name',
							onCellClicked: (event) => {
								navigate(`/portals/${event.data?.id}/overview`);
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
									<Styles.CellWrapper key={params.context?.id}>
										{params?.data?.contextTypes?.map((type) => {
											return (
												<Styles.Chip variant="default" key={type}>
													{type}
												</Styles.Chip>
											);
										})}
									</Styles.CellWrapper>
								);
							},
						},
						{
							field: 'id',
							headerName: 'Actions',
							minWidth: 200,
							cellRenderer: (params: CustomCellRendererProps<Portal>) => {
								return (
									<Styles.CellWrapper>
										<Button
											variant="ghost"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												setQuickEdit(params.data);
											}}
										>
											<Icon data={AllIcons.assignment} size={16} />
										</Button>
										<Button
											variant="ghost"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();

												navigate(`/portals/${params.data?.id}/overview`);
											}}
										>
											<Icon data={edit} size={16} />
										</Button>
										<Button
											variant="ghost"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												setIsDeleting(params.data);
											}}
										>
											<Icon data={delete_to_trash} size={16} />
										</Button>
									</Styles.CellWrapper>
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
			</Styles.TableContent>
		</AgStyle>
	);
}
