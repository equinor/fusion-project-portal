import { Client, PortalConfig } from '@portal/types';

export const getLegacyClientConfig = (): Client => ({
	baseUri: window._config_.portalClient.client.baseUri,
	defaultScopes: window._config_.portalClient.client.defaultScopes,
});
export const getLegacyFusionConfig = (): Client => ({
	baseUri: window._config_.serviceDiscovery.client.baseUri,
	defaultScopes: window._config_.serviceDiscovery.client.defaultScopes,
});

export const getFusionLegacyEnvIdentifier = (): string => {
	return window._config_.fusionLegacyEnvIdentifier.toUpperCase();
};

export function getFusionOrigin() {
	switch (getFusionLegacyEnvIdentifier().toLowerCase()) {
		case 'ci':
			return 'https://fusion.ci.fusion-dev.net/';

		case 'fqa':
			return 'https://fusion.fqa.fusion-dev.net/';

		case 'fprd':
			return 'https://fusion.equinor.com/';

		default:
			return 'https://fusion.equinor.com/';
	}
}

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
