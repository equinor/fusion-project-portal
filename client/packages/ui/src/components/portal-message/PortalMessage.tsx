import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { PortalMessageType } from './types/types';
import { getPortalMessageType } from './utils/get-portal-message-type';
import { error_outlined } from '@equinor/eds-icons';

const StylesWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	justify-content: center;
`;

const StylesContentWrapper = styled(Typography)`
	padding-top: 1rem;
`;

interface PortalErrorPageProps {
	title: string;
	body?: React.FC | string;
	type?: PortalMessageType;
	color?: string;
}

export function PortalMessage({ title, type = 'Info', color, children }: PropsWithChildren<PortalErrorPageProps>) {
	const currentType = getPortalMessageType(type);
	return (
		<StylesWrapper>
			<Icon
				data-testid="icon"
				size={40}
				color={currentType?.color || color || tokens.colors.text.static_icons__tertiary.hex}
				data={currentType?.icon || error_outlined}
			/>
			<Typography
				color={tokens.colors.text.static_icons__default.hex}
				variant="h1"
				aria-label={`Title for ${type} message`}
			>
				{title}
			</Typography>

			<StylesContentWrapper>{children && children}</StylesContentWrapper>
		</StylesWrapper>
	);
}
