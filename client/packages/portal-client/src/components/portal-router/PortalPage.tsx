import { PortalRoute } from '@portal/core';
import { FacilityPage, ProjectPage, ProjectPortalPage } from '@equinor/portal-pages';
import { LoadPage } from './LoadPage';

export const PortalPage = (prop: { route?: Partial<PortalRoute> }) => {
	switch (prop.route?.pageKey) {
		case 'project-portal':
			return <ProjectPortalPage />;
		case 'project':
			return <ProjectPage />;
		case 'facility':
			return <FacilityPage />;
		default:
			return <LoadPage {...prop.route} />;
	}
};
