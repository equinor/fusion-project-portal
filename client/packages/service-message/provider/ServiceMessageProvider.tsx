import { useSignalR } from '@equinor/fusion-framework-react/signalr';
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useLayoutEffect } from 'react';
import { useServiceMessageQuery } from '../query/use-service-message-query';
import { ServiceMessage } from '../types/types';
import { ServiceMessages } from '../services/service-message';
import { map } from 'rxjs';

interface IServiceMessageContext {
	serviceMessages: ServiceMessages;
	registerCurrentApps: (apps: string[]) => void;
	registerPortals: (portals: string[]) => void;
}

export const ServiceMessageContext = createContext<IServiceMessageContext | null>(null);

const serviceMessages = new ServiceMessages([]);

export const ServiceMessageProvider: FC<PropsWithChildren> = ({ children }) => {
	const { data } = useServiceMessageQuery();

	const registerCurrentApps = useCallback((apps?: string[]) => {
		serviceMessages.registerAppsFilter(apps);
	}, []);

	const registerPortals = useCallback((portals?: string[]) => {
		serviceMessages.registerPortalFilter(portals);
	}, []);

	useEffect(() => {
		if (!data) return;

		serviceMessages.next(data);
	}, [data]);

	const topic = useSignalR<unknown[]>('servicemessages', 'service-messages');

	useLayoutEffect(() => {
		const sub = topic.pipe(map((x) => x.shift() as ServiceMessage[])).subscribe(serviceMessages);

		return () => {
			sub.unsubscribe();
		};
	}, [topic]);

	return (
		<ServiceMessageContext.Provider value={{ serviceMessages, registerCurrentApps, registerPortals }}>
			{children}
		</ServiceMessageContext.Provider>
	);
};
