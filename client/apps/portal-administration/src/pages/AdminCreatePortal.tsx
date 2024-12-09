import { styled } from 'styled-components';
import { Loading } from '../components/Loading';
import { useAccess } from '../hooks/use-access';
import { Typography } from '@equinor/eds-core-react';
import { PageMessage } from '../components/PageMessage/PageMessage';
import { CreatePortalForm } from '../components/Portals/CreatePortalForm';

const Style = {
	Content: styled.div`
		margin-top: 1rem;
		width: 100%;
		height: -webkit-fill-available;
	`,
};

export const AdminCreatePortal = () => {
	const { data: hasAccess, isLoading } = useAccess();

	if (isLoading) {
		return <Loading detail="Loading Portals" />;
	}
	return (
		<Style.Content>
			{isLoading ? (
				<div style={{ width: '868px', height: '500px' }}>
					<Loading detail="Checking Access" />
				</div>
			) : hasAccess ? (
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
