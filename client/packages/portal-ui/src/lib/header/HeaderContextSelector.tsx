import styled from 'styled-components';
import { ContextSelector, useViewController } from '@equinor/portal-core';
export { ContextProvider } from '@equinor/portal-core';

const StyledWrapper = styled.span`
	width: 100%;
	max-width: 420px;
`;

export const TopBarContextSelector = () => {
	const { currentView } = useViewController();
	if (!currentView) return null;
	return (
		<StyledWrapper>
			<ContextSelector path={`/${currentView.key}`} variant={'header'} />
		</StyledWrapper>
	);
};
