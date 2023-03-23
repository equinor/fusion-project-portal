import { IContextProvider } from '@equinor/fusion-framework-module-context';
import { storage } from '@equinor/portal-utils';
import { setContextHistory } from './portal-context-history';

const CONTEXT_SOCAGE_KEY = 'context';

export function storeCurrentContext(contextProvider: IContextProvider) {
	contextProvider.currentContext$.subscribe((context) => {
		if (context?.title === 'Unexpected error' || !context?.id || !context) return;
		const storedContextId = storage.getItem<string>(CONTEXT_SOCAGE_KEY);

		// Update the history with the current context selected.
		setContextHistory(context);

		if (context.id !== storedContextId) {
			storage.setItem(CONTEXT_SOCAGE_KEY, context?.id);
		}
	});
}

export function setStoredContext(contextProvider: IContextProvider) {
	const storedContextId = storage.getItem<string>(CONTEXT_SOCAGE_KEY);

	if (storedContextId && window.location.pathname === '/') {
		const params = new URLSearchParams();
		params.append('contextId', storedContextId);
		window.location.replace(`context-page/?${params.toString()}`);
	}

	if (contextProvider.currentContext?.id !== storedContextId) {
		contextProvider.contextClient.setCurrentContext(storedContextId);
	}
}
