import { PortalRoute } from '@portal/core';
import { FacilityPage, ProjectPage, ProjectPortalPage } from '@equinor/portal-pages';
import { LoadPage } from './LoadPage';
import { useFeature } from '@equinor/fusion-framework-react-app/feature-flag';

export const PortalPage = (prop: { route?: Partial<PortalRoute> }) => {
	const { feature } = useFeature('landing-page');
	switch (prop.route?.pageKey) {
		case 'project-portal':
			return (
				<>
					{feature?.enabled ? (
						<LoadPage
							pageKey="project-portal-landingpage"
							path={prop.route.path}
							messages={prop.route.messages}
						/>
					) : (
						<ProjectPortalPage />
					)}
				</>
			);
		case 'project':
			return (
				<>
					{feature?.enabled ? (
						<LoadPage
							pageKey="project-landingpage"
							path={prop.route?.path}
							messages={prop.route?.messages}
						/>
					) : (
						<ProjectPage />
					)}
				</>
			);
		case 'facility':
			return (
				<>
					{feature?.enabled ? (
						<LoadPage
							pageKey="facility-landingpage"
							path={prop.route?.path}
							messages={prop.route?.messages}
						/>
					) : (
						<FacilityPage />
					)}
				</>
			);
		default:
			return <LoadPage {...prop.route} />;
	}
};
