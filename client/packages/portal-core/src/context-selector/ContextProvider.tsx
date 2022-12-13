
import { ContextProvider as FusionContextProvider } from '@equinor/fusion-react-context-selector';
import { ReactNode } from 'react';
import {
    useContextResolver,
    useFrameworkContext,
} from '../hooks';


interface PortalContextProviderProps {
    children: ReactNode
}

export const ContextProvider = ({ children }: PortalContextProviderProps) => {
    const resolver = useContextResolver(['ProjectMaster']);
    const contextProvider = useFrameworkContext();

    return (
        <FusionContextProvider
            resolver={{
                ...resolver,
                closeHandler: (e: MouseEvent) => {
                    e.stopPropagation();
                    contextProvider.clearCurrentContext();
                },
            }}
        >{children}
        </FusionContextProvider>
    );
};

