import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import { PortalAppTable } from '../components/PortalApps/PortalAppTable';
import { Loading } from '../components/Loading';
import { useGetPortalApps } from '../hooks/use-portal-apps';
import { useAccess } from '../access/hooks/useAccess';

const Style = {
	Wrapper: styled.div`
		height: calc(100% - 6rem);
		width: 100%;
		position: absolute;
	`,
	Content: styled.div`
		width: -webkit-fill-available;
		height: -webkit-fill-available;
	`,
};

export const PortalApps = () => {
	const { portalId } = useParams();

	const { data: portalApps, isLoading } = useGetPortalApps(portalId);

	const access = useAccess({ type: 'PortalApps', portalId: portalId });

	if (!portalId) {
		return <>No portalId provided</>;
	}

	if (isLoading && access.isCheckingAccess) {
		return <Loading detail="Loading Onboarded Apps" />;
	}

	return (
		<Style.Content>
			<PortalAppTable portalApps={portalApps ?? []} canEdit={access.canPost} />
		</Style.Content>
	);
};
