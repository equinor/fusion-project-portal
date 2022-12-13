
import { ContextProvider as FusionContextProvider } from '@equinor/fusion-react-context-selector';
import { ReactNode } from 'react';
import {
    useContextResolver,
} from '../hooks';


interface PortalContextProviderProps {
    children: ReactNode
}

export const ContextProvider = ({ children }: PortalContextProviderProps) => {
    //Todo: get contest types from view / work-surface
    const resolver = useContextResolver(['ProjectMaster']);


    return (
        <FusionContextProvider
            resolver={resolver}
        >
            {children}
        </FusionContextProvider >
    );
};

