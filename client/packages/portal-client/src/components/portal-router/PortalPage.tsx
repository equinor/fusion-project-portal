import { PortalRoute } from '@portal/core';
import { FacilityPage, ProjectPage, ProjectPortalPage } from '@equinor/portal-pages';
import { LoadPage } from './LoadPage';

const dev = true;

export const PortalPage = (prop: { route?: Partial<PortalRoute> }) => {
	switch (prop.route?.pageKey) {
		case 'project-portal':
			return dev ? <LoadPage {...prop.route} pageKey="project-portal-landingpage" /> : <ProjectPortalPage />;
		case 'project':
			return <ProjectPage />;
		case 'facility':
			return <FacilityPage />;
		default:
			return <LoadPage {...prop.route} />;
	}
};
