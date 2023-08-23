import { SignalRModuleConfigBuilder } from '@equinor/fusion-framework-module-signalr';

export const signalRConfigurator =
	(args: { name: string; path: string; service: string }) => async (builder: SignalRModuleConfigBuilder<unknown>) => {
		const authProvider = await builder.requireInstance('auth');
		const serviceDiscovery = await builder.requireInstance('serviceDiscovery');
		const service = await serviceDiscovery.resolveService(args.service);
		builder.addHub(args.name, {
			url: new URL(args.path, service.uri).toString(),
			options: {
				accessTokenFactory: async () => {
					const token = await authProvider.acquireAccessToken({
						scopes: service.defaultScopes,
					});
					if (!token) {
						throw Error('failed to acquire access token');
					}
					return token;
				},
			},
			automaticReconnect: true,
		});
	};
