import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import { PortalAppTable } from '../components/PortalApps/PortalAppTable';
import { Loading } from '../components/Loading';
import { useGetPortalApps } from '../hooks/use-portal-apps';
import { useGetPortal } from '../hooks/use-portal-query';
import { useCurrentAccount } from '@equinor/fusion-framework-react-app/msal';
import { useMemo } from 'react';
import { useAccess } from '../hooks/use-access';

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

	const { data: portal } = useGetPortal(portalId);

	const { data: isAdmin } = useAccess();

	const account = useCurrentAccount();
	const canEdit = useMemo(
		() => portal?.admins?.some((admin) => admin.azureUniqueId === account?.localAccountId) || isAdmin,
		[portal, account, isAdmin]
	);

	if (!portalId) {
		return <>No portalId provided</>;
	}

	if (isLoading) {
		return <Loading detail="Loading Onboarded Apps" />;
	}

	return (
		<Style.Content>
			<PortalAppTable portalApps={portalApps ?? []} canEdit={canEdit} />
		</Style.Content>
	);
};
