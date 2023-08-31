import { useFramework } from '@equinor/fusion-framework-react';
import { useCallback, useEffect, useState } from 'react';
import { usePortalConfig } from '../../hooks/use-portal-config';
import jwt_decode from 'jwt-decode';

type DecodedToken = {
	roles: string[];
};

export const useIsAdmin = () => {
	const { modules } = useFramework();
	const [isAdmin, setIsAdmin] = useState(false);
	const config = usePortalConfig();

	const getToken = useCallback(async () => {
		return await modules.auth.acquireAccessToken({ scopes: config.portalClient.client.defaultScopes });
	}, [config]);

	useEffect(() => {
		getToken().then((token) => {
			if (token) {
				const decoded: DecodedToken = jwt_decode(token);
				setIsAdmin(decoded.roles.includes('Fusion.ProjectPortal.Admin'));
			}
		});
	}, [getToken]);

	return isAdmin;
};
