import { useOnboardedContexts } from '@equinor/portal-core';
import { Navigate } from 'react-router-dom';

/** This component will navigate you to root if context is not onboarded */
export const HasContext = () => {
	const { hasContext, isLoading: isContextLoading } = useOnboardedContexts();

	if (isContextLoading) return null;

	if (!hasContext) return <Navigate to="/" />;
	return null;
};
