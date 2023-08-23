import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFrameworkCurrentContext, useAppModule, isLegacyFusionApplication, AppProvider } from '@equinor/portal-core';

import { verifyContextInURL } from '../../utils/context-utils';

export const AppPage = () => {
	const { appKey, contextId } = useParams();

	const context = useFrameworkCurrentContext();

	const navigate = useNavigate();

	const { appModule } = useAppModule();

	useEffect(() => {
		// Todo use context util
		if (context && !contextId && !verifyContextInURL(window.location.pathname)) {
			isLegacyFusionApplication({ appKey, appProvider: appModule }).then(
				// navigation should only be performed on new applications and not legacy applications
				(isLegacy) => !isLegacy && navigate(`${window.location.pathname}${context.id}`)
			);
		}
	}, [appKey, context, contextId]);

	return <AppProvider hasContext={Boolean(context)} appKey={appKey} />;
};
