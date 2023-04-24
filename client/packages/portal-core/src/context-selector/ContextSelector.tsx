import FusionContextSelector from '@equinor/fusion-react-context-selector';
import { NavigateFunction } from 'react-router-dom';
import { useFrameworkContext, useFrameworkCurrentContext } from '../hooks';
import { getPathUrl } from '../utils';

interface ContextSelectorProps {
	path: string;
	variant?: string;
	navigate?: NavigateFunction;
}

export const ContextSelector = ({ variant, path, navigate }: ContextSelectorProps) => {
	const contextProvider = useFrameworkContext();
	const currentContext = useFrameworkCurrentContext();

	return (
		<FusionContextSelector
			id="context-selector"
			variant={variant}
			onSelect={(e: any) => {
				e.stopPropagation();
				contextProvider.contextClient.setCurrentContext(e.nativeEvent.detail.selected[0].id);
				navigate &&
					navigate(getPathUrl(path, e.nativeEvent.detail.selected[0].id), {
						relative: 'route',
						replace: false,
					});
			}}
			value={currentContext?.id ? currentContext?.title || '' : ''}
			placeholder="Start to type to search..."
		/>
	);
};
