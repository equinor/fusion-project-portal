import styled from 'styled-components';
import { Icon, Typography } from '@equinor/eds-core-react';

import { ProfileListItem } from './ProfileListItem';
import { TeamsIcon, DelveIcon, Skeleton } from '@portal/ui';

import { PersonDetails } from '@portal/types';

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
			{user?.mobilePhone ? (
				<ProfileListItem
					icon={<Icon name="iphone" style={{ fontSize: '16px' }} />}
					href={`callto:${user.mobilePhone}`}
					toCopy={user.mobilePhone}
					text={user.mobilePhone}
					title="Phone number"
				/>
			) : (
				isLoading && <Skeleton width={60} style={{ margin: '1rem 0' }} />
			)}
			{user?.mail ? (
				<ProfileListItem
					icon={<TeamsIcon />}
					href={`msteams:/l/chat/0/0?users=${user.mail}`}
					toCopy={`msteams:/l/chat/0/0?users=${user.mail}`}
					text="Start a chat in Teams"
					title={`${user.name} Teams`}
				/>
			) : (
				isLoading && <Skeleton width={60} style={{ margin: '1rem 0' }} />
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
