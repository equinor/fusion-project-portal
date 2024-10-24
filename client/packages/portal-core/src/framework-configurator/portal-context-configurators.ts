import { IContextProvider } from '@equinor/fusion-framework-module-context';
import { storage } from '@portal/utils';
import { getContextFormUrl } from '../utils';

import { setContextHistory } from './portal-context-history';

const CONTEXT_SOCAGE_KEY = 'context';

export function storeCurrentContext(contextProvider: IContextProvider) {
	contextProvider.currentContext$.subscribe((context) => {
		if (context?.title === 'Unexpected error' || !context?.id || !context) {
			return;
		}

		const storedContextId = storage.getItem<string>(CONTEXT_SOCAGE_KEY);
		// Update the history with the current context selected.
		setContextHistory(context);

		if (context.id !== storedContextId) {
			storage.setItem(CONTEXT_SOCAGE_KEY, context?.id);
		}
	});
}

export function clearLocalContext() {
	storage.removeItem(CONTEXT_SOCAGE_KEY);
}

export function validateLocalContext(contextId: string): boolean {
	const storedContextId = storage.getItem<string>(CONTEXT_SOCAGE_KEY);
	return contextId === storedContextId;
}

export function setStoredContext(contextProvider: IContextProvider) {
	const storedContextId = storage.getItem<string>(CONTEXT_SOCAGE_KEY);

	const uriContext = getContextFormUrl();

	if (contextProvider.currentContext?.id !== storedContextId || uriContext) {
		contextProvider.contextClient.setCurrentContext(uriContext ? uriContext : storedContextId);
	}
}
