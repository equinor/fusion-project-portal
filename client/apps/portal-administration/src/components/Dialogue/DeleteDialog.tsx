import { Button, Dialog, Icon, Typography } from '@equinor/eds-core-react';
import { warning_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { styled } from 'styled-components';

type DeleteDialogProps = {
	open: boolean;
	onClose: () => void;
	onDelete: () => void;
	title: string;
	type: 'Portal' | 'Context' | 'Context Type';
};

const Style = {
	Actions: styled(Dialog.Actions)`
		gap: 1rem;
		display: flex;
		flex-direction: row;
	`,
	Dialog: styled(Dialog)`
		width: 500px;
	`,
	Row: styled.div`
		padding: 1rem;
		gap: 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
	`,
};

export const DeleteDialog = ({ open, onClose, onDelete, title, type }: DeleteDialogProps) => {
	return (
		<Style.Dialog onClose={onClose} open={open}>
			<Dialog.Header>
				Delete {type} - {title}
			</Dialog.Header>
			<Dialog.Content>
				<Style.Row>
					<Icon data={warning_outlined} color={tokens.colors.interactive.danger__resting.hex} size={48} />
					<Typography>
						Are you sure you want to delete this {type.toLowerCase()}?<br />
					</Typography>
				</Style.Row>
			</Dialog.Content>
			<Style.Actions>
				<Button variant="outlined" onClick={onClose}>
					Cancel
				</Button>
				<Button onClick={onDelete}>Delete</Button>
			</Style.Actions>
		</Style.Dialog>
	);
};
