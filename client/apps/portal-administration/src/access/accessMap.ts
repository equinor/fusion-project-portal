import { c } from 'vite/dist/node/types.d-aGj9QkWt';

export type AccessConfig =
	| { type: 'ContextTypes' }
	| { type: 'ContextType'; contextType: string }
	| { type: 'OnboardedApps' }
	| { type: 'OnboardedApp'; appKey: string }
	| { type: 'OnboardedAppContextTypes'; appKey: string }
	| { type: 'OnboardedAppContextType'; appKey: string; contextType: string }
	| { type: 'OnboardedContexts' }
	| { type: 'OnboardedContext'; contextId: string }
	| { type: 'OnboardedContextType' }
	| { type: 'Portals' }
	| { type: 'Portal'; portalId: string }
	| { type: 'PortalConfiguration'; portalId: string }
	| { type: 'PortalApps'; portalId: string }
	| { type: 'PortalApp'; portalId: string; appKey: string }
	| { type: 'PortalContextApp'; portalId: string; contextId: string };

export type AccessType = AccessConfig['type'];

export type AccessArgs<T extends AccessType> = Extract<AccessConfig, { type: T }>;

export function getOptionsUrlByType<T extends AccessType>(config: AccessArgs<T>): string | undefined {
	switch (config.type) {
		case 'ContextTypes':
			return `api/context-types`;
		case 'ContextType':
			return `api/context-types/${(config as AccessArgs<'ContextType'>).contextType}`;
		case 'OnboardedApps':
			return `api/onboarded-apps`;
		case 'OnboardedApp':
			return `api/onboarded-apps/${(config as AccessArgs<'OnboardedApp'>).appKey}`;
		case 'OnboardedAppContextTypes': {
			const { appKey } = config as AccessArgs<'OnboardedAppContextTypes'>;
			if (!appKey) {
				return;
			}
			return `api/onboarded-apps/${appKey}/context-types`;
		}
		case 'OnboardedAppContextType': {
			const { appKey, contextType } = config as AccessArgs<'OnboardedAppContextType'>;
			return `api/onboarded-apps/${appKey}/context-types/${contextType}`;
		}
		case 'OnboardedContexts':
			return `api/onboarded-contexts`;
		case 'OnboardedContext': {
			const { contextId } = config as AccessArgs<'OnboardedContext'>;
			return `api/onboarded-contexts/${contextId}`;
		}
		case 'Portals':
			return `api/portals`;
		case 'Portal': {
			const { portalId } = config as AccessArgs<'Portal'>;
			return `api/portals/${portalId}`;
		}
		case 'PortalConfiguration': {
			const { portalId } = config as AccessArgs<'PortalConfiguration'>;
			return `api/portals/${portalId}/configuration`;
		}
		case 'PortalApps': {
			const { portalId } = config as AccessArgs<'PortalApps'>;
			return `api/portals/${portalId}/apps`;
		}
		case 'PortalApp': {
			const { portalId, appKey } = config as AccessArgs<'PortalApp'>;
			return `api/portals/${portalId}/apps/${appKey}`;
		}
		case 'PortalContextApp': {
			const { portalId, contextId } = config as AccessArgs<'PortalContextApp'>;
			return `api/portals/${portalId}/contexts/${contextId}/apps`;
		}
		default:
			return;
	}
}

getOptionsUrlByType({ type: 'Portals' });
getOptionsUrlByType({ type: 'Portal', portalId: '123' });
