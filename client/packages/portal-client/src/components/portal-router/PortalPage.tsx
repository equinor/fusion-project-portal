import { PortalRoute } from '@portal/core';
import { LoadPage } from './LoadPage';

export const PortalPage = (prop: { route?: Partial<PortalRoute> }) => {
	switch (prop.route?.pageKey) {
		case 'project-portal':
			return (
				<LoadPage pageKey="project-portal-landingpage" path={prop.route.path} messages={prop.route.messages} />
			);
		case 'project':
			return <LoadPage pageKey="project-landingpage" path={prop.route?.path} messages={prop.route?.messages} />;
		case 'facility':
			return <LoadPage pageKey="facility-landingpage" path={prop.route?.path} messages={prop.route?.messages} />;
		default:
			return <LoadPage {...prop.route} />;
	}
};
