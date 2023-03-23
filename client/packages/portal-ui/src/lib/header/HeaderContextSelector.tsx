import styled from 'styled-components';
import { ContextSelector } from '@equinor/portal-core';
export { ContextProvider } from '@equinor/portal-core';

const StyledWrapper = styled.span`
	width: 45%;
`;

export const TopBarContextSelector = () => {
	return (
		<StyledWrapper>
			<ContextSelector variant={'header'} />
		</StyledWrapper>
	);
};
