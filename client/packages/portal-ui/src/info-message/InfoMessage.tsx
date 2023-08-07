import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StylesWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20% 0;
	justify-content: center;
	place-self: auto center;
`;

export function InfoMessage({ children }: PropsWithChildren) {
	return (
		<StylesWrapper>
			<Icon
				id="InfoMessageIcon"
				size={48}
				color={tokens.colors.text.static_icons__tertiary.hex}
				name="info_circle"
			/>
			<Typography color={tokens.colors.text.static_icons__tertiary.hex} variant="h6">
				{children}
			</Typography>
		</StylesWrapper>
	);
}
