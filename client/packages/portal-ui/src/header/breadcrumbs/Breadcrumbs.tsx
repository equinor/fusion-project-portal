import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppBreadcrumb } from './AppBreadcrumb';
import { AppGroupBreadCrumb } from './AppGroupBreadCrumb';

import { StyledBreadcrumbs, StyledBreadcrumbItem, StyledBreadcrumbItemInteract } from './styles';
import { useCurrentAppGroup, getContextTypeName } from '@portal/core';

export const Breadcrumbs = () => {
	const context = useFrameworkCurrentContext();
	const navigate = useNavigate();

	const { appKey } = useParams();
	const { currentAppGroup } = useCurrentAppGroup(appKey);

	const [appSelectorOpen, setAppSelectorOpen] = useState(false);
	const location = useLocation();

	const contextName = getContextTypeName(context?.type.id);

	return (
		<StyledBreadcrumbs>
			<StyledBreadcrumbItem> </StyledBreadcrumbItem>
			{context && location.pathname !== '/' && (
				<StyledBreadcrumbItemInteract
					onClick={() => {
						navigate(`/${contextName.toLowerCase()}/${context.id}`);
					}}
				>
					{currentAppGroup ? <span>{contextName}</span> : <b>{contextName}</b>}
				</StyledBreadcrumbItemInteract>
			)}
			{currentAppGroup && <AppGroupBreadCrumb name={currentAppGroup.name || 'unknown'} />}
			{currentAppGroup && (
				<AppBreadcrumb
					appCategory={currentAppGroup}
					isMenuOpen={appSelectorOpen}
					setMenuOpen={setAppSelectorOpen}
				/>
			)}

			<StyledBreadcrumbItem></StyledBreadcrumbItem>
		</StyledBreadcrumbs>
	);
};
