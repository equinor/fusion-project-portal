import styled from 'styled-components';
import { Typography } from '@equinor/eds-core-react';
import { getDepartment, getJobTitle, useUserPhoto } from '@portal/core';
import { PersonDetails } from '@portal/types';
import { Avatar, Skeleton, getAccountTypeColor } from '@portal/ui';

const Style = {
	InfoWrapper: styled.div`
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	`,
};

export const ProfileCardHeader = ({ user }: { user?: PersonDetails }) => {
	const { data: url } = useUserPhoto(user?.azureUniqueId);
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
			<Avatar url={url} borderColor={getAccountTypeColor(user.accountType)} width={60} height={60} />
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
