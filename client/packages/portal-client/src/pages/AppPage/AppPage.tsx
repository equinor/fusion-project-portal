import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verifyContextInURL } from '../../utils/context-utils';
import { AppProvider } from '../../components/app-provider/AppProvider';
import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { useFramework } from '@equinor/fusion-framework-react';
import { AppModule, AppModulesInstance } from '@equinor/fusion-framework-module-app';
import { ContextModule } from '@equinor/fusion-framework-module-context';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';

const useAppContextHandler = () => {
	const { contextId } = useParams();
	const framework = useFramework<[AppModule, NavigationModule]>();

	const context = useFrameworkCurrentContext();

	useEffect(() => {
		return framework.modules.event.addEventListener('onReactAppLoaded', (e) => {
			const contextProvider = (e.detail.modules as AppModulesInstance<[ContextModule]>).context;
			if (contextProvider && context && !contextId && !verifyContextInURL(window.location.pathname)) {
				framework.modules.navigation.replace(`${window.location.pathname}${context.id}`);
			}
		});
	}, [framework, contextId, context]);

	useEffect(() => {
		return framework.modules.event.addEventListener('onReactAppLoaded', (e) => {
			console.debug('onReactAppLoaded', 'using legacy context hack method');
			const contextProvider = (e.detail.modules as AppModulesInstance<[ContextModule]>).context;
			if (contextProvider && !contextProvider.currentContext && context) {
				contextProvider.setCurrentContextAsync(context);
			}
		});
	}, [framework, context]);
};

export const AppPage = () => {
	const { appKey } = useParams();

	useAppContextHandler();

	const context = useFrameworkCurrentContext();

	return <AppProvider hasContext={Boolean(context)} appKey={appKey} />;
};
