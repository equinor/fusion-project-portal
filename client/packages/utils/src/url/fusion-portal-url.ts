import { PortalConfig } from '@portal/types';

export const getFusionPortalURL = () => {
	switch (window._config_.fusionLegacyEnvIdentifier.toLowerCase()) {
		case 'fprd':
			return 'https://fusion.equinor.com';
		case 'ci':
			return 'fusion.ci.fusion-dev.net';
		case 'fqa':
			return 'fusion.fqa.fusion-dev.net';
		default:
			return 'fusion.ci.fusion-dev.net';
	}
};

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
