import { Client, PortalConfig } from '../../types';

export const getLegacyClientConfig = (): Client => ({
	baseUri: window._config_.portalClient.client.baseUri,
	defaultScopes: window._config_.portalClient.client.defaultScopes,
});

export const getFusionLegacyEnvIdentifier = (): string => {
	return window._config_.fusionLegacyEnvIdentifier;
};
declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
