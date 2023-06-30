import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentAppGroup, useFrameworkCurrentContext } from '../hooks';
import AppModuleLoader from './AppModuleLoader';
import { AppNotAwaitable } from './AppNotAwaitable';

export const AppLoader = () => {
	const { appKey, contextId } = useParams();
	const navigate = useNavigate();
	const { currentAppGroup, isLoading, appManifest } = useCurrentAppGroup(appKey);

	const context = useFrameworkCurrentContext();
	console.log(appManifest);
	if (
		!appManifest?.isLegasy &&
		context &&
		!contextId &&
		!location.pathname.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/)
	) {
		//navigate(`${location.pathname}${context.id}`);
	}

	if (!currentAppGroup && appManifest && !isLoading) {
		return <AppNotAwaitable name={appManifest.name} />;
	}

	if (appKey) {
		return <AppModuleLoader appKey={appKey} />;
	}

	return <p> No app key provided.</p>;
};
