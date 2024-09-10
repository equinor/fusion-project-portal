import { styled } from 'styled-components';
import { DeleteDialog } from '../Dialogue/DeleteDialog';
import { Button, Icon, TextField, Typography } from '@equinor/eds-core-react';
import { save, delete_to_trash } from '@equinor/eds-icons';
import { useState } from 'react';
import { useDeletePortal } from '../../hooks/use-portal-query';
import { Portal } from '../../types';
import { InfoPopover } from '../InfoPopover';
import { DataClarification } from '../DataClarification';
import { useNavigate } from 'react-router-dom';

const Style = {
	ActionBar: styled.div<{ gap: string }>`
		display: flex;
		justify-content: 'flex-end';
		gap: ${(props) => props.gap};
	`,
	Wrapper: styled.div`
		display: flex;
		justify-content: space-between;
		width: 100%;
	`,
	Row: styled.div`
		display: flex;
		align-items: center;
	`,
};

type FormActionBarProps = {
	isDisabled: boolean;
	portal: Portal;
	isIcons?: boolean;
	onClose: VoidFunction;
};

export const FormActionBar = ({ isDisabled, portal, isIcons, onClose }: FormActionBarProps) => {
	const { mutateAsync: deletePortal } = useDeletePortal();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const navigation = useNavigate();
	return (
		<Style.Wrapper>
			{!isIcons && (
				<Style.Row>
					<Typography variant="h4">{portal ? `${portal.name} - Config` : 'Postal  Config'}</Typography>
					<InfoPopover title="Portal Config">
						<Typography>Portal configuration is where you can manage the portal settings.</Typography>
					</InfoPopover>
				</Style.Row>
			)}
			<Style.Row>
				<DataClarification />
				<Style.ActionBar gap={isIcons ? '0' : '1rem'}>
					<Button
						variant={isIcons ? 'ghost_icon' : 'contained'}
						form="portal"
						type="submit"
						disabled={isDisabled}
					>
						{!isIcons ? <Icon data={save} size={16} /> : <Icon data={save} />}
						{!isIcons && 'Save'}
					</Button>
					<Button variant={isIcons ? 'ghost_icon' : 'outlined'} onClick={() => setIsDeleting(true)}>
						{!isIcons ? <Icon data={delete_to_trash} size={16} /> : <Icon data={delete_to_trash} />}
						{!isIcons && 'Delete'}
					</Button>

					<DeleteDialog
						type="Portal"
						open={isDeleting}
						onClose={() => setIsDeleting(false)}
						onDelete={() => {
							deletePortal(portal);
							setIsDeleting(false);
							navigation('/portals');
							onClose();
						}}
						title={portal.name}
					></DeleteDialog>
				</Style.ActionBar>
			</Style.Row>
		</Style.Wrapper>
	);
};
