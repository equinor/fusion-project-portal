import { Button } from '@equinor/eds-core-react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFrameworkCurrentContext } from '../hooks';
import { getPathUrl } from '../utils';
import { ContextSelector } from './ContextSelector';

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

type PortalContextSelectorProps = {
	path: string;
	title: string;
};

export const PortalContextSelector = ({ path, title }: PortalContextSelectorProps) => {
	const currentContext = useFrameworkCurrentContext();
	const navigate = useNavigate();

	return (
		<StyledWrapper>
			<ContextSelector path={path} navigate={navigate} />
			<StyledActionWrapper>
				{currentContext && (
					<StyledButton
						variant="ghost"
						onClick={() => {
							navigate(getPathUrl(path, currentContext?.id));
						}}
					>
						Go to {title.toLowerCase()}
					</StyledButton>
				)}
			</StyledActionWrapper>
		</StyledWrapper>
	);
};
