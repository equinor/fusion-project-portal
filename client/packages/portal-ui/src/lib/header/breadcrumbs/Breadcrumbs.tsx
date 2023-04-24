import { useCurrentAppGroup, useFrameworkCurrentContext, useViewController } from '@equinor/portal-core';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppBreadcrumb } from './AppBreadcrumb';
import { AppGroupBreadCrumb } from './AppGroupBreadCrumb';

import { StyledBreadcrumbs, StyledBreadcrumbItem, StyledBreadcrumbItemInteract } from './styles';

export const Breadcrumbs = () => {
	const context = useFrameworkCurrentContext();
	const { currentView } = useViewController();
	const navigate = useNavigate();

	const { appKey } = useParams();
	const { currentAppGroup } = useCurrentAppGroup(appKey);

	const [appSelectorOpen, setAppSelectorOpen] = useState(false);
	const location = useLocation();

	return (
		<StyledBreadcrumbs>
			<span />
			{context && location.pathname !== '/' && (
				<StyledBreadcrumbItemInteract
					onClick={() => {
						currentView && navigate(`/${currentView.key}/${context.id}`);
					}}
				>
					{currentView?.name}
				</StyledBreadcrumbItemInteract>
			)}
			{currentAppGroup && <AppGroupBreadCrumb name={currentAppGroup.name} />}
			{currentAppGroup && (
				<AppBreadcrumb
					appGroup={currentAppGroup}
					isMenuOpen={appSelectorOpen}
					setMenuOpen={setAppSelectorOpen}
				/>
			)}

			<StyledBreadcrumbItem></StyledBreadcrumbItem>
		</StyledBreadcrumbs>
	);
};
