import styled from 'styled-components';
import { ContextSelector, useViewController } from '@equinor/portal-core';
import { useNavigate, useParams } from 'react-router-dom';
export { ContextProvider } from '@equinor/portal-core';

const StyledWrapper = styled.span`
	width: 100%;
	max-width: 420px;
`;

export const TopBarContextSelector = () => {
	const { currentView } = useViewController();
	const { contextId } = useParams();
	const navigate = useNavigate();

	const shouldAddNavigate = !contextId && !location.pathname.includes('apps');

	if (!currentView) return null;
	return (
		<StyledWrapper>
			<ContextSelector variant={'header'} navigate={shouldAddNavigate ? navigate : undefined} />
		</StyledWrapper>
	);
};
