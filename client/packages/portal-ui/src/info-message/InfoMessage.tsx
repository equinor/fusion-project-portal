import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Style = {
	Wrapper: styled.div`
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20% 0;
		justify-content: center;
		place-self: auto center;
	`,
	Typography: styled(Typography)`
		padding-top: 1rem;
		text-align: center;
	`,
};

export function InfoMessage({ children }: PropsWithChildren) {
	return (
		<Style.Wrapper>
			<Icon size={48} color={tokens.colors.text.static_icons__tertiary.hex} name="info_circle" />
			<Style.Typography color={tokens.colors.text.static_icons__tertiary.hex} variant="h6">
				{children}
			</Style.Typography>
		</Style.Wrapper>
	);
}
