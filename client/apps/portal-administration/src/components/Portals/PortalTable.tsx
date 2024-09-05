import styled from 'styled-components';
import { ClientGrid } from '@equinor/workspace-ag-grid';
import { Portal } from '../../types';
import { useNavigate } from 'react-router-dom';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { Button, Chip, Icon } from '@equinor/eds-core-react';
import { edit, delete_to_trash } from '@equinor/eds-icons';
import { useRef } from 'react';
import { useResizeObserver } from '../../hooks/use-resise-observer';
import * as AllIcons from '@equinor/eds-icons';
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

	const ref = useRef(null);
	const [_, height] = useResizeObserver(ref);

	return (
		<Styles.TableContent ref={ref}>
			<ClientGrid<Portal>
				height={height - 208}
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
								<div key={params.data?.id}>
									{params.data?.icon && Object.keys(AllIcons).includes(params.data?.icon) ? (
										<Icon name={params.data?.icon} size={48} />
									) : (
										<Styles.Icon
											dangerouslySetInnerHTML={{
												__html: params.data?.icon.replace(/\s+/g, ' ').trim(),
											}}
										/>
									)}
								</div>
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
					},
					{
						field: 'shortName',
						headerName: 'Short Name',
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
						cellRenderer: (params: CustomCellRendererProps<Portal>) => {
							return (
								<Styles.CellWrapper>
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
		</Styles.TableContent>
	);
}
