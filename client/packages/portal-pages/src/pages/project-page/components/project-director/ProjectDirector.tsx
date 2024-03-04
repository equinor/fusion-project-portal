import { useUser } from '@portal/core';
import { Card, Typography } from '@equinor/eds-core-react';
import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { ProfileCardHeader } from '@portal/components';
import { NoProjectInfoAccessMessage } from '../messages/NoProjectInfoAccessMessage';
import { useCurrentDirector } from './hooks/use-current-director';

export const ProjectDirector = () => {
	const context = useFrameworkCurrentContext();
	const { director, error, isLoading } = useCurrentDirector(context?.id);

	const { data } = useUser(director?.assignedPerson?.azureUniqueId);

	if (!director && !error && !isLoading) {
		return null;
	}

	return (
		<Card elevation="raised">
			<Card.Header>
				<Typography variant="h6">Project Director</Typography>
			</Card.Header>
			{error ? <NoProjectInfoAccessMessage /> : <ProfileCardHeader user={data} trigger="click" />}
		</Card>
	);
};
