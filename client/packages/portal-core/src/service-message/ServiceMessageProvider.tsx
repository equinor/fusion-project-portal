import { makeStyles } from "@equinor/fusion-react-styles";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState, useSyncExternalStore } from "react"
import { BehaviorSubject, combineLatestWith, filter, map, Observable } from "rxjs";
import { useSignalRTopic } from "../module-signalr"
import { ServiceMessage } from "./types"
import { useServiceMessageQuery } from "./use-service-message-query"

interface IServiceMessageContext {
    serviceMessages: ServiceMessages;
}

const ServiceMessageContext = createContext<IServiceMessageContext | null>(null);

class ServiceMessages {
    messages$: BehaviorSubject<ServiceMessage[]>;
    appMessages$: Observable<ServiceMessage[]>;
    currentAppMessages$: Observable<ServiceMessage[]>;
    portal$: Observable<ServiceMessage[]>;
    currentAppKey$: BehaviorSubject<string>;



    constructor(_initial: ServiceMessage[]) {
        this.messages$ = new BehaviorSubject(_initial);
        this.currentAppKey$ = new BehaviorSubject("");
        this.appMessages$ = this.messages$.pipe(combineLatestWith(this.currentAppKey$), map(([messages, appKey]) => messages.filter((message) => message.scope === "App" && message.relevantApps?.some(app => app.key !== appKey))));
        this.currentAppMessages$ = this.messages$.pipe(combineLatestWith(this.currentAppKey$), map(([messages, appKey]) => messages.filter(message => message.relevantApps?.some(app => app.key === appKey))));
        this.portal$ = this.messages$.pipe(map((messages) => messages.filter((message) => message.scope === "Portal")));
    }

    nextMessages(value: ServiceMessage[]) {
        this.messages$.next(value);
    }

    setCurrentApp(appKey: string) {
        this.currentAppKey$.next(appKey);
    }

    get appMessages() {
        return this.messages$.value.filter((message) => message.scope === "App" && message.relevantApps?.some(app => app.key !== this.currentAppKey$.value));
    }
    get currentAppMessages() {
        return this.messages$.value.filter((message) => message.relevantApps?.some(app => app.key === this.currentAppKey$.value));
    }
    get portalMessages() {
        return this.messages$.value.filter((message) => message.scope === "Portal");
    }

}

const serviceMessages = new ServiceMessages([])

export const ServiceMessageProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

    const { data } = useServiceMessageQuery();

    useEffect(() => {
        if (data)
            serviceMessages.nextMessages(data)
    }, [data]);

    useSignalRTopic("service-messages", (message: unknown[]) => {
        message = message.shift() as unknown[];
        const messages = JSON.parse(JSON.stringify(message)) as ServiceMessage[];
        serviceMessages.nextMessages(messages)
    });


    return <ServiceMessageContext.Provider value={{ serviceMessages }}>{children}</ServiceMessageContext.Provider>
}

export const useServiceMessage = (appKey?: string) => {
    const context = useContext(ServiceMessageContext);

    if (!context) {
        throw new Error("ServiceMessageContext context used out of bounds");
    }

    useEffect(() => {
        context.serviceMessages.setCurrentApp(appKey || "")
    }, [appKey, context])

    const [appsMessages, setAppsMessages] = useState<ServiceMessage[]>(context.serviceMessages.appMessages);
    const [portalMessages, setPortalMessages] = useState<ServiceMessage[]>(context.serviceMessages.appMessages);
    const [currentAppMessages, setCurrentAppMessages] = useState<ServiceMessage[]>(context.serviceMessages.appMessages);

    useSyncExternalStore(() => {
        const sub = context.serviceMessages.appMessages$.subscribe(setAppsMessages);
        return () => {
            sub.unsubscribe()
        }
    }, () => context.serviceMessages.appMessages);

    useSyncExternalStore(() => {
        const sub = context.serviceMessages.currentAppMessages$.subscribe(setCurrentAppMessages);
        return () => {
            sub.unsubscribe()
        }
    }, () => context.serviceMessages.currentAppMessages);


    useSyncExternalStore(() => {
        const sub = context.serviceMessages.portal$.subscribe(setPortalMessages);
        return () => {
            sub.unsubscribe()
        }
    }, () => context.serviceMessages.portalMessages);


    return {
        appsMessages,
        portalMessages,
        currentAppMessages
    }
}