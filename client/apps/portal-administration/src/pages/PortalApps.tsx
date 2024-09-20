import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useOnboardApps } from '../hooks/use-onboard-apps';

import { PortalAppTable } from '../components/PortalApps/PortalAppTable';
import { Loading } from '../components/Loading';

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

	const { data: portalApps, isLoading } = useOnboardApps(portalId);

	if (!portalId) {
		return <>No portalId provided</>;
	}

	if (isLoading) {
		return <Loading detail="Loading Onboarded Apps" />;
	}

	return (
		<Style.Content>
			<PortalAppTable portalApps={portalApps} />
		</Style.Content>
	);
};
