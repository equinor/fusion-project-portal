import { useParams } from 'react-router-dom';
import { useGetPortal } from '../hooks/use-portal-query';
import { Loading } from '../components/Loading';

import { RouterConfigContextComponent } from '../context/RouterContext';
import { RouterTree } from '../components/Router/RouterTree';
import { RouterEdit } from '../components/Router/RouterEdit';

export const RouterConfig = () => {
	const { portalId } = useParams();
	const { data: portal, isLoading: portalIsLoading } = useGetPortal(portalId);

	if (portalIsLoading) return <Loading detail="Loading Portal Route Config" />;

	return (
		<RouterConfigContextComponent>
			<RouterTree />
			<RouterEdit />
		</RouterConfigContextComponent>
	);
};
