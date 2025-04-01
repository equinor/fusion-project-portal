import FusionContextSelector, { ContextResult, ContextSelectEvent } from '@equinor/fusion-react-context-selector';
import { NavigateFunction } from 'react-router-dom';
import { useFrameworkContext } from '../hooks';

import { useOnboardedContexts } from '../hooks/use-onboarded-contexts';
interface ContextSelectorProps {
	variant?: string;
	navigate?: NavigateFunction;
}

export const ContextSelector = ({ variant }: ContextSelectorProps) => {
	const contextProvider = useFrameworkContext();
	const { currentContext } = useOnboardedContexts();

	return (
		<FusionContextSelector
			id="context-selector"
			variant={variant}
			onSelect={(e: ContextSelectEvent) => {
				e.stopPropagation();
				// sins this is a single select the will be the next context at index 0
				const context = (e.nativeEvent.detail.selected as ContextResult)[0];
				contextProvider.setCurrentContextByIdAsync(context.id);
			}}
			value={currentContext?.id ? currentContext?.title || '' : ''}
			placeholder="Start to type to search..."
			selectTextOnFocus={true}
		/>
	);
};
