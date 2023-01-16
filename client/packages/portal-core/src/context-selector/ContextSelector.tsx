
import FusionContextSelector from '@equinor/fusion-react-context-selector';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
    useContextResolver,
    useFrameworkContext,
    useFrameworkCurrentContext,
} from '../hooks';
import { getContextPageUrl } from './utils';

interface PortalContextSelectorProps {
    variant?: string
    navigate?: NavigateFunction;
}

export const ContextSelector = ({ variant, navigate }: PortalContextSelectorProps) => {
    const contextProvider = useFrameworkContext();
    const currentContext = useFrameworkCurrentContext();

    return (

        <FusionContextSelector
            id="context-selector"
            variant={variant}
            onSelect={(e: any) => {
                e.stopPropagation();
                contextProvider.contextClient.setCurrentContext(e.nativeEvent.detail.selected[0].id);
                navigate && navigate(getContextPageUrl(e.nativeEvent.detail.selected[0].id), {
                    relative: 'route',
                    replace: false,

                });
            }}
            value={currentContext?.id ? currentContext?.title || "" : ''}
            placeholder="Start to type to search..."

        />
    );
};

