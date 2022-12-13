
import FusionContextSelector from '@equinor/fusion-react-context-selector';
import { useNavigate } from 'react-router-dom';
import {
    useContextResolver,
    useFrameworkContext,
    useFrameworkCurrentContext,
} from '../hooks';
import { getContextPageUrl } from './utils';

interface PortalContextSelectorProps {
    variant?: string
}

export const ContextSelector = ({ variant }: PortalContextSelectorProps) => {
    const contextProvider = useFrameworkContext();
    const currentContext = useFrameworkCurrentContext();
    const navigate = useNavigate();

    return (

        <FusionContextSelector
            id="context-selector"
            variant={variant}
            onSelect={(e: any) => {
                e.stopPropagation();
                contextProvider.contextClient.setCurrentContext(e.nativeEvent.detail.selected[0].id);
                navigate(getContextPageUrl(e.nativeEvent.detail.selected[0].id));
            }}
            value={currentContext?.id ? currentContext?.title || "" : ''}
            placeholder="Start to type to search..."

        />
    );
};

