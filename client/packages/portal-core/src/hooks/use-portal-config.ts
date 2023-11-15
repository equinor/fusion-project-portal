import { PortalConfig } from '@portal/types';

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}

export const usePortalConfig = () => {
	return window['_config_'];
};
