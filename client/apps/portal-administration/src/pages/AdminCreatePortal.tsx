import { styled } from 'styled-components';
import { Loading } from '../components/Loading';

import { Typography } from '@equinor/eds-core-react';
import { PageMessage } from '../components/PageMessage/PageMessage';
import { CreatePortalForm } from '../components/Portals/CreatePortalForm';
import { useAccess } from '../access/hooks/useAccess';

const Style = {
	Content: styled.div`
		margin-top: 1rem;
		width: 100%;
		height: -webkit-fill-available;
	`,
};

export const AdminCreatePortal = () => {
	const { canPost, isCheckingAccess } = useAccess({ type: 'Portals' });

	if (isCheckingAccess) {
		return <Loading detail="Loading Portals" />;
	}
	return (
		<Style.Content>
			{isCheckingAccess ? (
				<div style={{ width: '868px', height: '500px' }}>
					<Loading detail="Checking Access" />
				</div>
			) : canPost ? (
				<CreatePortalForm />
			) : (
				<div style={{ width: '868px', height: '500px' }}>
					<PageMessage type="Warning" title="No Access">
						<Typography>You do not have the permissions to create a new portal.</Typography>
						<Typography>
							Required role is <b>Fusion.ProjectPortal.Admin</b>.
						</Typography>
					</PageMessage>
				</div>
			)}
		</Style.Content>
	);
};
