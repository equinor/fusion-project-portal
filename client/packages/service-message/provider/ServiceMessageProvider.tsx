
import { useSignalRTopic } from "@equinor/portal-core";
import { storage } from "@equinor/portal-utils";
import { createContext, FC, PropsWithChildren, useEffect, } from "react"
import { BehaviorSubject, combineLatestWith, map, Observable } from "rxjs";


import { useServiceMessageQuery } from "../query/use-service-message-query";
import { AppReference, ServiceMessage } from "../types/types";


interface IServiceMessageContext {
    serviceMessages: ServiceMessages;
}

export const ServiceMessageContext = createContext<IServiceMessageContext | null>(null);


export interface AppServiceMessage extends AppReference {
    messages: ServiceMessage[]
}

const SERVICE_MESSAGE = "SERVICE_MESSAGE";

class ServiceMessages {
    messages$: BehaviorSubject<ServiceMessage[]>;
    appMessages$: Observable<AppServiceMessage[]>;
    currentMessages$: Observable<ServiceMessage[]>;
    portal$: Observable<ServiceMessage[]>;
    currentAppKey$: BehaviorSubject<string>;
    shownMessages$: BehaviorSubject<string[]>;

    constructor(_initial: ServiceMessage[]) {

        this.messages$ = new BehaviorSubject(_initial);
        this.currentAppKey$ = new BehaviorSubject("");
        this.shownMessages$ = new BehaviorSubject(this.#getShownMessages())
        this.appMessages$ = this.messages$.pipe(map((messages) => this.#appServiceMessageMapper(messages)));
        this.currentMessages$ = this.messages$.pipe(combineLatestWith(this.currentAppKey$, this.shownMessages$), map(([messages, appKey, shownMessages]) => messages.filter(message => message.scope === "Portal" || message.relevantApps?.some(app => app.key === appKey)).filter(message => !shownMessages.includes(message.id))));
        this.portal$ = this.messages$.pipe(map((messages) => messages.filter((message) => message.scope === "Portal")));

    }

    #getShownMessages(): string[] {
        const messages = storage.getItem<string[]>(SERVICE_MESSAGE);

        if (!messages) {
            return [];
        }
        if (typeof messages === "string") {
            return [messages]
        }
        return messages

    }

    #appServiceMessageMapper(serviceMessages: ServiceMessage[]): AppServiceMessage[] {
        const currentAppMessageRecord = serviceMessages.filter((message) => message.scope === "App").reduce(this.#reduceAppServiceMessage, {})
        return Object.keys(currentAppMessageRecord).map(key => currentAppMessageRecord[key])
    }

    #reduceAppServiceMessage = (acc: Record<string, AppServiceMessage>, message: ServiceMessage): Record<string, AppServiceMessage> => {
        if (!message.relevantApps) return acc
        message.relevantApps.forEach(app => {
            if (acc[app.key]) {
                acc[app.key].messages.push(message)
                acc[app.key].messages = this.#sortMessages(acc[app.key].messages)
            } else {
                acc[app.key] = {
                    ...app,
                    messages: [message]
                }
            }

        });
        return acc;
    }
    #sortMessages(serviceMessages: ServiceMessage[]): ServiceMessage[] {
        return serviceMessages.sort((a: ServiceMessage, b: ServiceMessage) => {
            return new Date(b.timestamp).getUTCDate() - new Date(a.timestamp).getUTCDate()
        }).sort((a: ServiceMessage, b: ServiceMessage): number => {
            const statusValues = {
                Issue: 3,
                Maintenance: 2,
                Info: 1
            }

            return statusValues[b.type] - statusValues[a.type]
        });
    }

    setMessageShown = (messageId: string) => {

        if (!this.shownMessages$.value.includes(messageId)) {
            const messages = [...this.shownMessages$.value, messageId]
            this.shownMessages$.next(messages)
            storage.setItem("SERVICE_MESSAGE", JSON.stringify(messages));
        }
    }

    nextMessages(value: ServiceMessage[]) {
        this.messages$.next(value);
    }

    setCurrentApp(appKey: string) {
        this.currentAppKey$.next(appKey);
    }

    get appMessages() {
        return this.#appServiceMessageMapper(this.messages$.value);
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
        if (data) {
            serviceMessages.nextMessages(data)
        }
    }, [data]);

    useSignalRTopic("service-messages", (message: unknown[]) => {
        message = message.shift() as unknown[];
        const messages = JSON.parse(JSON.stringify(message)) as ServiceMessage[];
        serviceMessages.nextMessages(messages)
    });


    return <ServiceMessageContext.Provider value={{ serviceMessages }}>{children}</ServiceMessageContext.Provider>
}
