import styled from 'styled-components';
import { Typography } from '@equinor/eds-core-react';
import { getDepartment, getJobTitle } from '@portal/core';
import { PersonDetails } from '@portal/types';
import { Skeleton } from '@portal/ui';
import { PersonAvatar } from '@equinor/fusion-react-person';

const Style = {
	InfoWrapper: styled.div`
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	`,
};

export const ProfileCardHeader = ({
	user,
	trigger = 'none',
}: {
	user?: PersonDetails;
	trigger?: 'click' | 'hover' | 'none';
}) => {
	if (!user) {
		return (
			<Style.InfoWrapper>
				<Skeleton variant="circle" size="medium" />

				<div>
					<Skeleton width="200px" />
					<div style={{ paddingTop: '0.5rem', gap: '0.2rem', display: 'flex', flexDirection: 'column' }}>
						<Skeleton width={60} />
						<Skeleton width={60} />
					</div>
				</div>
			</Style.InfoWrapper>
		);
	}

	return (
		<Style.InfoWrapper>
			<PersonAvatar azureId={user.azureUniqueId} trigger={trigger} />
			<div>
				<Typography variant="h6">{user?.name}</Typography>
				<div>
					<Typography>{getJobTitle(user)}</Typography>
					<Typography>{getDepartment(user)}</Typography>
				</div>
			</div>
		</Style.InfoWrapper>
	);
};
