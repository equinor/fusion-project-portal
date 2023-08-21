import { clearLocalContext } from '../framework-configurator';
import { useOnboardedContextsQuery } from '../queries';
import { useFrameworkContext } from './use-framework-context';

import { useFrameworkCurrentContext } from './use-framework-current-context';

export const useOnboardedContexts = () => {
	const { data, isLoading } = useOnboardedContextsQuery();
	const contextProvider = useFrameworkContext();
	const currentContext = useFrameworkCurrentContext();

	const clearContext = () => {
		contextProvider.clearCurrentContext();
		clearLocalContext();
	};

	return {
		isLoading,
		onboardedContexts: data,
		hasContext: Boolean(
			data?.find((context) => context.externalId === currentContext?.externalId) || !currentContext
		),
		currentContext,
		clearContext,
	};
};
