import { Icon, Snackbar } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useSnackBar } from '../hooks/use-snack-bar';
import { check_circle_outlined, error_filled } from '@equinor/eds-icons';

export const Snack = () => {
	const { messages, removeMessage } = useSnackBar();

	return (
		<Styled.Wrapper>
			{Object.values(messages).map(({ message, type, id }, idx) => {
				return (
					<Styled.Snackbar
						key={id}
						open={true}
						$idx={idx}
						placement="bottom-left"
						autoHideDuration={5000}
						onClose={() => {
							removeMessage(id);
						}}
					>
						<Styled.SnackContent>
							<Icon data={type === 'error' ? error_filled : check_circle_outlined} size={16} />
							<div>{message}</div>
						</Styled.SnackContent>
					</Styled.Snackbar>
				);
			})}
		</Styled.Wrapper>
	);
};

const Styled = {
	Wrapper: styled.div`
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 1em;
	`,
	Snackbar: styled(Snackbar).attrs<{ $idx?: number }>((props) => ({
		$idx: props.$idx || 0,
	}))`
		bottom: calc(16px + (${(props) => props.$idx} * 4rem));
	`,
	SnackContent: styled.div`
		display: flex;
		align-items: flex-end;
		gap: 1em;
	`,
};
