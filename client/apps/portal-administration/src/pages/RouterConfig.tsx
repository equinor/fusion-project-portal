import { useParams } from 'react-router-dom';
import { useGetPortal } from '../hooks/use-portal-query';
import { Loading } from '../components/Loading';

import { RouterConfigContextComponent } from '../context/RouterContext';
import { RouterTree } from '../components/Router/RouterTree';
import { RouterEdit } from '../components/Router/RouterEdit';
import { useCurrentAccount } from '@equinor/fusion-framework-react-app/msal';
import { useMemo } from 'react';
import { useAccess } from '../hooks/use-access';

export const RouterConfig = () => {
	const { portalId } = useParams();
	const { data: portal, isLoading: portalIsLoading } = useGetPortal(portalId);

	const { data: isAdmin } = useAccess();

	const account = useCurrentAccount();
	const canEdit = useMemo(
		() => portal?.admins?.some((admin) => admin.azureUniqueId === account?.localAccountId) || isAdmin,
		[portal, account, isAdmin]
	);

	if (portalIsLoading) return <Loading detail="Loading Portal Route Config" />;

	return (
		<RouterConfigContextComponent>
			<RouterTree canEdit={canEdit} />
			<RouterEdit canEdit={canEdit} />
		</RouterConfigContextComponent>
	);
};
