import { useEffect, useMemo } from 'react';
import { clearLocalContext } from '../framework-configurator';
import { useOnboardedContextsQuery } from '../queries';

import { useFrameworkCurrentContext } from './use-framework-current-context';
import { useFramework } from '@equinor/fusion-framework-react';

import { useNavigate } from 'react-router-dom';

export const useOnboardedContexts = () => {
	const { data, isLoading } = useOnboardedContextsQuery();
	const { modules } = useFramework();
	const currentContext = useFrameworkCurrentContext();

	const hasContext = useMemo(
		() => Boolean(data?.find((context) => context.externalId === currentContext?.externalId) || !currentContext),
		[data, currentContext]
	);

	const clearContext = () => {
		modules.context.clearCurrentContext();
		clearLocalContext();
	};

	return {
		isLoading,
		onboardedContexts: data,
		hasContext,
		currentContext,
		clearContext,
	};
};

export const useOnboardedContextsDialog = (allowAllContext?: boolean) => {
	const onboardedContexts = useOnboardedContexts();
	const navigate = useNavigate();
	const { hasContext, isLoading } = onboardedContexts;

	useEffect(() => {
		if (allowAllContext) return;
		if (!isLoading && !hasContext) {
			navigate('/');
		}
	}, [hasContext, isLoading, allowAllContext]);

	return {
		...onboardedContexts,
		hasContext: allowAllContext || onboardedContexts.hasContext,
	};
};
