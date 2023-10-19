import { Button, Typography } from '@equinor/eds-core-react';

import { FC, useState } from 'react';
import styled from 'styled-components';
import { PortalMessagePage } from '../portal-message-page';

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;
`;

const StyledStackWrapper = styled.section`
	position: absolute;
	margin-top: 350px;
	z-index: 0;
`;

interface ErrorViewProps {
	error: Error;
}

export const ErrorViewer: FC<ErrorViewProps> = ({ error }) => {
	const [showStack, setShowStack] = useState(false);
	const cause = error.cause as Error;
	return (
		<PortalMessagePage title={`${error.name} - ${error.message}`} type="Error">
			<StyledWrapper>
				{cause && <Typography>{cause.message}</Typography>}
				<Button
					variant="ghost"
					id={'showStackButton'}
					onClick={() => {
						setShowStack((s) => !s);
					}}
				>
					Toggle developer information
				</Button>

				{showStack && <StyledStackWrapper>{error.stack && <pre>{error.stack}</pre>}</StyledStackWrapper>}
			</StyledWrapper>
		</PortalMessagePage>
	);
};
