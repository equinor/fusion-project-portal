import FusionContextSelector from '@equinor/fusion-react-context-selector';
import { NavigateFunction } from 'react-router-dom';
import { useFrameworkContext } from '../hooks';
import { getPathUrl } from '../utils';

import { useOnboardedContexts } from '../hooks/use-onboarded-contexts';

interface ContextSelectorProps {
	path: string;
	variant?: string;
	navigate?: NavigateFunction;
}

export const ContextSelector = ({ variant, path, navigate }: ContextSelectorProps) => {
	const contextProvider = useFrameworkContext();

	const { onboardedContexts, currentContext } = useOnboardedContexts();

	return (
		<FusionContextSelector
			id="context-selector"
			variant={variant}
			onSelect={(e: any) => {
				e.stopPropagation();

				const newContextId = e.nativeEvent.detail.selected[0].id as string;
				contextProvider.contextClient.setCurrentContext(newContextId);
				if (
					onboardedContexts?.find(
						(context) => context.externalId === e.nativeEvent.detail.selected[0].externalId
					)
				) {
					navigate &&
						navigate(getPathUrl(path, newContextId), {
							relative: 'route',
							replace: false,
						});
				}
			}}
			value={currentContext?.id ? currentContext?.title || '' : ''}
			placeholder="Start to type to search..."
		/>
	);
};
