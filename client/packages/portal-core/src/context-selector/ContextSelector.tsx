import FusionContextSelector, { ContextResult } from '@equinor/fusion-react-context-selector';
import { NavigateFunction } from 'react-router-dom';
import { useFrameworkContext } from '../hooks';
import { getContextPageURL } from '../utils';

import { useOnboardedContexts } from '../hooks/use-onboarded-contexts';
import { useEffect } from 'react';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useFramework } from '@equinor/fusion-framework-react';

interface ContextSelectorProps {
	variant?: string;
	navigate?: NavigateFunction;
}

export const ContextSelector = ({ variant }: ContextSelectorProps) => {
	const contextProvider = useFrameworkContext();
	const { modules } = useFramework<[NavigationModule]>();
	const { currentContext } = useOnboardedContexts();

	useEffect(() => {
		modules.event.addEventListener('onCurrentContextChanged', (event) => {
			const url = new URL(getContextPageURL(event.detail.next), location.origin);
			if (location.href !== url.href) modules.navigation.replace(url);
		});
	}, []);

	return (
		<FusionContextSelector
			id="context-selector"
			variant={variant}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onSelect={(e: any) => {
				e.stopPropagation();

				const context = (e.nativeEvent.detail.selected as ContextResult)[0];
				contextProvider.contextClient.setCurrentContext(context.id);
			}}
			value={currentContext?.id ? currentContext?.title || '' : ''}
			placeholder="Start to type to search..."
		/>
	);
};
