import { useFramework } from '@equinor/fusion-framework-react';
import { useCallback, useEffect, useState } from 'react';
import { usePortalConfig } from '../../hooks/use-portal-config';
import { AuthenticationResult } from '@azure/msal-browser';
import jwt_decode from 'jwt-decode';

type DecodedToken = {
	roles: string[];
};

export const useIsAdmin = () => {
	const { modules } = useFramework();
	const [isAdmin, setIsAdmin] = useState(false);
	const config = usePortalConfig();

	const acquireToken = useCallback(async () => {
		const token = (await modules.auth.acquireToken({
			scopes: config.portalClient.client.defaultScopes,
		})) as AuthenticationResult;

		// Todo: Verify scopes
		return token.accessToken;
	}, []);

	useEffect(() => {
		acquireToken().then((token) => {
			if (token) {
				const decoded: DecodedToken = jwt_decode(token);
				setIsAdmin(decoded.roles.includes('Fusion.ProjectPortal.Admin'));
			}
		});
	}, [acquireToken]);

	return isAdmin;
};
