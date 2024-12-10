import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

import { PropsWithChildren } from 'react';
import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';
import { getGreeting } from './utils';

export const StyledHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	> :not(:first-child) {
		margin-left: 0px;
	}
	/* margin-top: 2rem; */
`;

export const ProjectHeader = ({ children }: PropsWithChildren) => {
	const user = useCurrentUser();

	return (
		<section>
			<StyledHeader>
				<Typography variant="h1">Welcome to Portal Administration</Typography>
				<Typography variant="h6">
					{getGreeting()} {user?.name}
				</Typography>
			</StyledHeader>
		</section>
	);
};
