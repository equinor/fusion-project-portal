import { useParams } from 'react-router-dom';
import { useGetPortal } from '../hooks/use-portal-query';
import { Loading } from '../components/Loading';

import { RouterConfigContextComponent } from '../context/RouterContext';
import { RouterTree } from '../components/Router/RouterTree';
import { RouterEdit } from '../components/Router/RouterEdit';
import { useCurrentAccount } from '@equinor/fusion-framework-react-app/msal';
import { useMemo } from 'react';
import { useAccess } from '../access/hooks/useAccess';

export const RouterConfig = () => {
	const { portalId } = useParams();
	const { data: portal, isLoading: portalIsLoading } = useGetPortal(portalId);

	const { canPut, isCheckingAccess } = useAccess({ type: 'PortalConfiguration', portalId: portalId || '' });

	const account = useCurrentAccount();

	if (portalIsLoading || isCheckingAccess) return <Loading detail="Loading Portal Route Config" />;

	return (
		<RouterConfigContextComponent>
			<RouterTree canEdit={canPut} />
			<RouterEdit canEdit={canPut} />
		</RouterConfigContextComponent>
	);
};
