import { useSignalR } from '@equinor/fusion-framework-react/signalr';

import { createContext, FC, PropsWithChildren, useCallback, useEffect, useLayoutEffect } from 'react';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';

import { useServiceMessageQuery } from '../query/use-service-message-query';
import { AppReference, PortalReference, ServiceMessage } from '../types/types';

interface IServiceMessageContext {
	serviceMessages: ServiceMessages;
	registerCurrentApps: (apps: string[]) => void;
	registerPortals: (portals: string[]) => void;
}

export const ServiceMessageContext = createContext<IServiceMessageContext | null>(null);

export interface AppServiceMessage extends AppReference {
	messages: ServiceMessage[];
}
export interface PortalServiceMessage extends PortalReference {
	messages: ServiceMessage[];
}

class ServiceMessages {
	messages$: Observable<ServiceMessage[]>;

	#messages$: BehaviorSubject<ServiceMessage[]>;

	#portalsFilter$: BehaviorSubject<string[] | undefined>;

	#appsFilter$: BehaviorSubject<string[] | undefined>;

	appMessages$: Observable<AppServiceMessage[]>;

	currentPortalAndAppMessages$: Observable<ServiceMessage[]>;

	portal$: Observable<PortalServiceMessage[]>;

	currentAppKey$: BehaviorSubject<string>;

	constructor(_initial: ServiceMessage[]) {
		this.currentAppKey$ = new BehaviorSubject('');

		this.#portalsFilter$ = new BehaviorSubject<string[] | undefined>(undefined);
		this.#appsFilter$ = new BehaviorSubject<string[] | undefined>(undefined);

		this.#messages$ = new BehaviorSubject(_initial);
		this.messages$ = this.#messages$
			.pipe(
				combineLatestWith(this.#appsFilter$),
				map(([messages, apps]) =>
					messages.filter(
						(message) =>
							message.scope === 'Portal' ||
							message.relevantApps?.some((app) => (apps ? apps?.includes(app.key) : true))
					)
				)
			)
			.pipe(
				combineLatestWith(this.#portalsFilter$),
				map(([messages, portals]) =>
					messages.filter(
						(message) =>
							message.scope === 'App' ||
							message.relevantPortals?.some((portal) =>
								portals ? portals?.includes(portal.identifier) : true
							)
					)
				)
			);

		this.appMessages$ = this.messages$.pipe(map((messages) => this.#appServiceMessageMapper(messages)));

		this.currentPortalAndAppMessages$ = this.messages$.pipe(
			combineLatestWith(this.currentAppKey$),
			map(([messages, appKey]) =>
				messages.filter(
					(message) => message.scope === 'Portal' || message.relevantApps?.some((app) => app.key === appKey)
				)
			)
		);
		this.portal$ = this.messages$.pipe(map((messages) => this.#portalServiceMessageMapper(messages)));
	}

	#appServiceMessageMapper = (serviceMessages: ServiceMessage[]): AppServiceMessage[] => {
		const currentAppMessageRecord = serviceMessages
			.filter((message) => message.scope === 'App')
			.reduce(this.#reduceAppServiceMessage, {});
		return Object.keys(currentAppMessageRecord).map((key) => currentAppMessageRecord[key]);
	};

	#portalServiceMessageMapper = (serviceMessages: ServiceMessage[]): PortalServiceMessage[] => {
		return Object.values(
			serviceMessages.filter((message) => message.scope === 'Portal').reduce(this.#reducePortalServiceMessage, {})
		);
	};

	// eslint-disable-next-line class-methods-use-this
	#sortMessages = (serviceMessages: ServiceMessage[]): ServiceMessage[] => {
		return serviceMessages
			.sort((a: ServiceMessage, b: ServiceMessage) => {
				return new Date(b.timestamp).getUTCDate() - new Date(a.timestamp).getUTCDate();
			})
			.sort((a: ServiceMessage, b: ServiceMessage): number => {
				const statusValues = {
					Issue: 3,
					Maintenance: 2,
					Info: 1,
				};

				return statusValues[b.type] - statusValues[a.type];
			});
	};

	#reduceAppServiceMessage = (
		acc: Record<string, AppServiceMessage>,
		message: ServiceMessage
	): Record<string, AppServiceMessage> => {
		if (!message.relevantApps) return acc;
		message.relevantApps.forEach((app) => {
			if (acc[app.key]) {
				acc[app.key].messages.push(message);
				acc[app.key].messages = this.#sortMessages(acc[app.key].messages);
			} else {
				acc[app.key] = {
					...app,
					messages: [message],
				};
			}
		});
		return acc;
	};

	#reducePortalServiceMessage = (
		acc: Record<string, PortalServiceMessage>,
		message: ServiceMessage
	): Record<string, PortalServiceMessage> => {
		if (!message.relevantPortals) return acc;
		message.relevantPortals.forEach((portal) => {
			if (acc[portal.identifier]) {
				acc[portal.identifier].messages.push(message);
				acc[portal.identifier].messages = this.#sortMessages(acc[portal.identifier].messages);
			} else {
				acc[portal.identifier] = {
					...portal,
					messages: [message],
				};
			}
		});
		return acc;
	};

	next(value: ServiceMessage[]) {
		this.#messages$.next(value);
	}

	registerAppsFilter(value?: string[]) {
		this.#appsFilter$.next(value);
	}

	registerPortalFilter(value?: string[]) {
		this.#portalsFilter$.next(value);
	}

	setCurrentApp(appKey: string) {
		this.currentAppKey$.next(appKey);
	}

	get appMessages() {
		return this.#appServiceMessageMapper(this.#messages$.value);
	}

	get currentAppMessages() {
		return this.#messages$.value.filter((message) =>
			message.relevantApps?.some((app) => app.key === this.currentAppKey$.value)
		);
	}

	get portalMessages() {
		return this.#messages$.value.filter((message) => message.scope === 'Portal');
	}
}

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

	const topic = useSignalR<unknown[]>('portal', 'service-messages');

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
