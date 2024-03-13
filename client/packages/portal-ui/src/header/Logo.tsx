import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { PortalIcon } from './Icon';
import { usePortalConfig } from '@portal/core';

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	cursor: pointer;
`;

const StyledTitle = styled(Typography)`
	padding-left: 0.5rem;
	white-space: nowrap;
	@media only screen and (max-width: 45rem) {
		display: none;
	}
`;

interface PortalLogoProps {
	onClick: () => void;
}

export function PortalLogo({ onClick }: PortalLogoProps): JSX.Element {
	const { portal } = usePortalConfig();

	return (
		<StyledWrapper onClick={onClick}>
			<PortalIcon />
			<StyledTitle variant="h6" title={portal?.subtext}>
				{portal?.name}
			</StyledTitle>
		</StyledWrapper>
	);
}
