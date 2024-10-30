import { Button } from '@equinor/eds-core-react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ContextSelector } from './ContextSelector';
import { useContextProvider } from '@equinor/fusion-framework-react-app/context';
import { getContextPageURL } from '../hooks/utils';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useFramework } from '@equinor/fusion-framework-react';

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
	const { currentContext } = useContextProvider();
	const { modules } = useFramework<[NavigationModule]>();

	return (
		<StyledWrapper>
			<ContextSelector />
			<StyledActionWrapper>
				{currentContext && (
					<StyledButton
						variant="ghost"
						onClick={() => {
							modules.navigation.replace(getContextPageURL(currentContext));
						}}
					>
						Go to {currentContext.title}
					</StyledButton>
				)}
			</StyledActionWrapper>
		</StyledWrapper>
	);
};
