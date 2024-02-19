import { PortalRoute } from '@portal/core';
import { FacilityPage, ProjectPage, ProjectPortalPage } from '@equinor/portal-pages';
import { AppElementProvider } from '../app-element-provider/AppElementProvider';
import { PortalMessagePage, PortalProgressLoader } from '@equinor/portal-ui';

export const PortalPage = (prop: { route?: Omit<PortalRoute, 'path'> }) => {
	switch (prop.route?.pageKey) {
		case 'project-portal':
			return <ProjectPortalPage />;
		case 'project':
			return <ProjectPage />;
		case 'facility':
			return <FacilityPage />;
		default:
			return <LoadPage pageKey={prop.route?.pageKey} message={prop.route?.messages?.loadingMessage} />;
	}
};

const LoadPage = ({ pageKey, message }: { pageKey?: string; message?: string }) => {
	if (!pageKey) return <PortalMessagePage title="PageKey not provided " />;
	return (
		<AppElementProvider appKey={pageKey}>
			<PortalProgressLoader title={message || 'Loading Page'} />
		</AppElementProvider>
	);
};
