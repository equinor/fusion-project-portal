import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { PortalIcon } from './Icon';

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const StyledTitle = styled(Typography)`
	padding-left: 0.5rem;
	white-space: nowrap;
`;

interface PortalLogoProps {
	title: string;
	onClick: () => void;
}

export function PortalLogo({ title, onClick }: PortalLogoProps): JSX.Element {
	return (
		<StyledWrapper onClick={onClick}>
			<PortalIcon />
			<StyledTitle variant="h6">{title}</StyledTitle>
		</StyledWrapper>
	);
}
