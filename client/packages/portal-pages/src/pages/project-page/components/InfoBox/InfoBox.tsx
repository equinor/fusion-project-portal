import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Card, Typography } from '@equinor/eds-core-react';

export const Styled = {
	FusionInfo: styled(Card)`
		background: ${tokens.colors.infographic.primary__moss_green_21.hex};
		position: relative;
		padding: ${tokens.spacings.comfortable.medium};
	`,
	InfoTitle: styled(Typography)`
		margin-bottom: ${tokens.spacings.comfortable.small};
	`,
	InfoContent: styled(Typography)`
		ul {
			margin: 0;
			padding-left: ${tokens.spacings.comfortable.medium};
		}
	`,
	CloseButton: styled.div`
		position: absolute;
		top: ${tokens.spacings.comfortable.small};
		right: ${tokens.spacings.comfortable.small};
	`,
};

export const InfoBox = (): JSX.Element => {
	return (
		<Styled.FusionInfo elevation="raised">
			<Styled.InfoTitle group="paragraph" variant="body_long_bold">
				Project Portal gives you quick access to
			</Styled.InfoTitle>
			<Styled.InfoContent group="paragraph" variant="body_long">
				<ul>
					<li>Verified data from multiple sources</li>
					<li>Information customized to your position</li>
					<li>Application scoped to your project</li>
				</ul>
			</Styled.InfoContent>
		</Styled.FusionInfo>
	);
};

export default InfoBox;
