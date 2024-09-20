 
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Button, Typography } from '@equinor/eds-core-react';
import { PropsWithChildren } from 'react';

// Images
import img1 from './slides/wizard_01.png';
import img2 from './slides/wizard_02.png';
import img3 from './slides/wizard_03.png';
import img4 from './slides/wizard_04.png';

const wizardWidth = '51rem';
const imageHeight = 23;

export const Styled = {
	Wizard: styled.div`
		width: ${wizardWidth};
		border-radius: ${tokens.spacings.comfortable.small};
		background: ${tokens.colors.ui.background__default.hex};
	`,
	Content: styled.div`
		padding: ${tokens.spacings.comfortable.xxx_large} ${tokens.spacings.comfortable.large};
	`,
	Title: styled(Typography)`
		color: ${tokens.colors.interactive.primary__resting.hex};
		padding-bottom: ${tokens.spacings.comfortable.xx_large};
		text-align: center;
	`,
	Description: styled(Typography)`
		color: ${tokens.colors.text.static_icons__secondary.hex};
		text-align: center;
	`,
	Image: styled.div`
		height: ${imageHeight}rem;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		margin-bottom: ${tokens.spacings.comfortable.xxx_large};

		&.wizard-1 {
			background-image: url(${img1});
		}

		&.wizard-2 {
			background-image: url(${img2});
		}

		&.wizard-3 {
			background-image: url(${img3});
		}

		&.wizard-4 {
			background-image: url(${img4});
		}
	`,
	Buttons: styled.div`
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: ${tokens.spacings.comfortable.medium} ${tokens.spacings.comfortable.large};
		border-top: 1.4px solid ${tokens.colors.interactive.disabled__border.hex};
	`,
};

const NextButtonStyled = styled(Button)`
	margin-left: auto;
`;

type WizardStepProps = {
	id: number;
	title: string;
	back?: string;
	next?: string;
	onBack?: () => void;
	onNext?: () => void;
};

export const WizardStep = (props: PropsWithChildren<WizardStepProps>): JSX.Element => {
	const { id, title, back, next, onNext, onBack, children } = props;

	return (
		<Styled.Wizard>
			<Styled.Content>
				<Styled.Title group="heading" variant="h1">
					{title}
				</Styled.Title>
				<Styled.Description group="heading" variant="h4">
					{children}
				</Styled.Description>
			</Styled.Content>
			<Styled.Image className={'wizard-' + id}></Styled.Image>
			<Styled.Buttons>
				{onBack && (
					<Button variant="outlined" onClick={onBack}>
						{back ?? 'Back'}
					</Button>
				)}
				{onNext && (
					<NextButtonStyled variant="contained" onClick={onNext}>
						{next ?? 'Next'}
					</NextButtonStyled>
				)}
			</Styled.Buttons>
		</Styled.Wizard>
	);
};
