import { Button } from '@equinor/eds-core-react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getContextPageURL } from '@portal/core';
import { ContextSelector } from './ContextSelector';
import { useOnboardedContexts } from '../hooks/use-onboarded-contexts';

const StyledWrapper = styled.div`
	display: flex;
	width: 50vw;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 0.5rem;

	> fwc-searchable-dropdown-provider {
		flex: 1;
	}

	@media only screen and (max-width: 60rem) {
		width: 80vw;
	}
	@media only screen and (max-width: 45rem) {
		width: 90vw;
		flex-direction: column;
	}
`;

const StyledButton = styled(Button)`
	white-space: nowrap;
`;
const StyledActionWrapper = styled.div`
	min-width: 120px;
`;

export const PortalContextSelector = () => {
	const { hasContext, currentContext } = useOnboardedContexts();

	const navigate = useNavigate();

	return (
		<StyledWrapper>
			<ContextSelector />
			<StyledActionWrapper>
				{currentContext && hasContext && (
					<StyledButton
						variant="ghost"
						onClick={() => {
							navigate(getContextPageURL(currentContext));
						}}
					>
						Go to {currentContext.title}
					</StyledButton>
				)}
			</StyledActionWrapper>
		</StyledWrapper>
	);
};
