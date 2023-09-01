import { useFramework } from '@equinor/fusion-framework-react';
import { useCallback, useEffect, useState } from 'react';
import { usePortalConfig } from '../../hooks/use-portal-config';
import { AuthenticationResult } from '@azure/msal-browser';
import jvt_decode from 'jwt-decode';

type IdTokenClaims = {
	roles?: string[];
};

const b64DecodeUnicode = (str: string) =>
	decodeURIComponent(
		Array.prototype.map.call(atob(str), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
	);

const parseJwt = (token: string) =>
	JSON.parse(b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/')));

export const useIsAdmin = () => {
	const { modules } = useFramework();
	const [isAdmin, setIsAdmin] = useState(false);
	const config = usePortalConfig();

	const isUserAdmin = useCallback(async () => {
		// const scope =
		// 	config.portalClient.client.defaultScopes[0].split('/').slice(0, 3)?.toString().replaceAll(',', '/') +
		// 	'/.default';
		// console.log(scope);
		const authenticationResult = (await modules.auth.acquireToken({
			scopes: config.portalClient.client.defaultScopes,
		})) as AuthenticationResult;
		const peopleHttpClient = await modules.serviceDiscovery.createClient('people');

		const clientId = modules.auth.defaultAccount?.localAccountId;
		if (clientId) {
			const user = await peopleHttpClient.json(
				`/persons/${clientId}?api-version=3.0&$expand=positions,contracts,roles`
			);
			console.log('user: ', user);
		}

		// const { roles } = authenticationResult.idTokenClaims as IdTokenClaims;

		// console.log('idTokenClaims: ', authenticationResult.idTokenClaims);
		return (
			// roles?.includes('Fusion.ProjectPortal.Admin') ||
			(parseJwt(authenticationResult.accessToken) as IdTokenClaims).roles?.includes(
				'Fusion.ProjectPortal.Admin'
			) || false
		);
	}, []);

	useEffect(() => {
		isUserAdmin().then((isAdmin) => {
			console.log('idAdmin', isAdmin);
			setIsAdmin(isAdmin);
		});
	}, [isUserAdmin]);

	return isAdmin;
};
