import { ContextProvider as FusionContextProvider } from '@equinor/fusion-react-context-selector';
import { ReactNode } from 'react';
import { useContextResolver } from '../hooks';
import { usePortalConfig } from '@portal/core';

interface PortalContextProviderProps {
	children: ReactNode;
}

export const ContextProvider = ({ children }: PortalContextProviderProps) => {
	const { portal } = usePortalConfig();
	const resolver = useContextResolver(portal?.contexts?.map((context) => context.type) || ['ProjectMaster']);

	return <FusionContextProvider resolver={resolver}>{children}</FusionContextProvider>;
};
