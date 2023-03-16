import { useCurrentAppGroup, useFrameworkCurrentContext } from '@equinor/portal-core';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppBreadcrumb } from './AppBreadcrumb';
import { AppGroupBreadCrumb } from './AppGroupBreadCrumb';

import { StyledBreadcrumbs, StyledBreadcrumbItem } from './styles';

export const Breadcrumbs = () => {
	const context = useFrameworkCurrentContext();
	const navigate = useNavigate();

	const { appKey } = useParams();
	const { currentAppGroup } = useCurrentAppGroup(appKey);

	const [appSelectorOpen, setAppSelectorOpen] = useState(false);
	const location = useLocation();

	return (
		<>
			<StyledBreadcrumbs>
				<span />
				{context && location.pathname !== '/' && (
					<StyledBreadcrumbItem
						onClick={() => {
							navigate(`/context-page/$contextId=${context.id}`);
						}}
					>
						Project Home
					</StyledBreadcrumbItem>
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
		</>
	);
};
