import { useParams } from 'react-router-dom';

import { Loading } from '../components/Loading';

import { RouterConfigContextComponent } from '../context/RouterContext';
import { RouterTree } from '../components/Router/RouterTree';
import { RouterEdit } from '../components/Router/RouterEdit';

import { useAccess } from '../access/hooks/useAccess';

export const RouterConfig = () => {
	const { portalId } = useParams();

	const { canPut, isCheckingAccess } = useAccess({ type: 'PortalConfiguration', portalId: portalId });

	if (isCheckingAccess) return <Loading detail="Loading Portal Route Config" />;

	return (
		<RouterConfigContextComponent>
			<RouterTree canEdit={canPut} />
			<RouterEdit canEdit={canPut} />
		</RouterConfigContextComponent>
	);
};
