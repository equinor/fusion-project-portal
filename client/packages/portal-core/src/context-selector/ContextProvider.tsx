import { ContextProvider as FusionContextProvider } from '@equinor/fusion-react-context-selector';
import { ReactNode } from 'react';
import { useContextResolver } from '../hooks';
import { useViewController } from '../providers';

interface PortalContextProviderProps {
	children: ReactNode;
}

export const ContextProvider = ({ children }: PortalContextProviderProps) => {
	const { currentView } = useViewController();
	const resolver = useContextResolver(currentView?.contexts?.map((context) => context.type) || ['ProjectMaster']);

	return <FusionContextProvider resolver={resolver}>{children}</FusionContextProvider>;
};
