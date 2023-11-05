import { Button, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { PersonDetails } from '@portal/types';

export const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	`,
};

export const MyRolesTab = ({ onClick, user }: { onClick: VoidFunction; user?: PersonDetails }) => {
	return (
		<Style.Wrapper>
			<Typography>My Roles</Typography>
			<Button variant="ghost" fullWidth onClick={onClick}>
				Back
			</Button>

			{user?.roles?.map((role) => (
				<div>{role.displayName}</div>
			))}
		</Style.Wrapper>
	);
};
