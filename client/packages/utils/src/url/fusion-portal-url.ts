import { PortalConfig } from '@portal/types';

export const getFusionPortalURL = () => {
	switch (window._config_.fusionLegacyEnvIdentifier.toLowerCase()) {
		case 'fprd':
			return 'https://fusion.equinor.com';
		case 'ci':
			return 'https://fusion.ci.fusion-dev.net';
		case 'fqa':
			return 'https://fusion.fqa.fusion-dev.net';
		default:
			return 'https://fusion.ci.fusion-dev.net';
	}
};

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
