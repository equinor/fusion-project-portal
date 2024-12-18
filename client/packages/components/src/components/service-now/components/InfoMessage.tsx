import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Styled = {
	InfoBar: styled.div`
		display: flex;
		padding: ${tokens.spacings.comfortable.medium_small};
		flex-direction: column;
		align-items: flex-start;
		gap: ${tokens.spacings.comfortable.medium_small};
		align-self: stretch;
		border-radius: 5px;
		background: ${tokens.colors.ui.background__info.rgba};
	`,
	Message: styled(Typography)`
		color: ${tokens.colors.text.static_icons__tertiary.rgba};
	`,
};

type InfoMessageProps = {
	message: ReactNode;
};

export const InfoMessage = ({ message }: InfoMessageProps): JSX.Element => {
	return (
		<Styled.InfoBar>
			<Styled.Message group="paragraph" variant="body_short">
				{message}
			</Styled.Message>
		</Styled.InfoBar>
	);
};

export default InfoMessage;
