import styled from 'styled-components';
import { Icon, Typography } from '@equinor/eds-core-react';

import { ProfileListItem } from './ProfileListItem';
import { TeamsIcon, DelveIcon, Skeleton } from '@portal/ui';

import { PersonDetails } from '@portal/types';
import { account_circle } from '@equinor/eds-icons';

const Style = {
	InfoWrapper: styled.div`
		display: flex;
		flex-direction: column;
		padding: 1rem, 0rem;
	`,
};

export const ProfileContactDetails = ({ user, isLoading }: { user?: PersonDetails; isLoading: boolean }) => {
	return (
		<Style.InfoWrapper>
			<Typography variant="h6">Contact Details</Typography>
			{user?.accountType ? (
				<ProfileListItem icon={<Icon data={account_circle} />} text={user.accountType} title="Account Type" />
			) : (
				isLoading && <Skeleton width={60} style={{ margin: '1rem 0' }} />
			)}
			{user?.mail ? (
				<ProfileListItem
					icon={<Icon name="email" style={{ fontSize: '16px' }} />}
					href={`mailto:${user.mail}`}
					toCopy={user.mail}
					text={user.mail}
					title="Email address"
				/>
			) : (
				isLoading && <Skeleton width={60} style={{ margin: '1rem 0' }} />
			)}
			{user?.preferredContactMail ? (
				<ProfileListItem
					icon={<Icon name="email" style={{ fontSize: '16px' }} />}
					href={`mailto:${user.preferredContactMail}`}
					toCopy={user.preferredContactMail}
					text={user.preferredContactMail}
					title="Preferred Email address"
				/>
			) : isLoading ? (
				<Skeleton width={60} style={{ margin: '1rem 0' }} />
			) : (
				<ProfileListItem
					icon={<Icon name="email" style={{ fontSize: '16px' }} />}
					text={'No preferred contact mail'}
					title="Preferred Email address"
				/>
			)}

			{user?.azureUniqueId ? (
				<ProfileListItem
					icon={<DelveIcon />}
					href={`https://eur.delve.office.com/?u=${user.azureUniqueId}&v=work`}
					toCopy={`https://eur.delve.office.com/?u=${user.azureUniqueId}&v=work`}
					text="Go to Delve account"
					title={`${user.name} Delve account`}
				/>
			) : (
				isLoading && <Skeleton width={60} style={{ margin: '1rem 0' }} />
			)}
		</Style.InfoWrapper>
	);
};
