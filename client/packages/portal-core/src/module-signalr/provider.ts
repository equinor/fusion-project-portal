
import { HubConnectionBuilder, HubConnection, IStreamResult, HubConnectionState } from "@microsoft/signalr"
import { Observable, shareReplay } from "rxjs";
import { SignalRConfig } from "./configurator";

export interface ISignalRProvider {
    connect<T>(methodName: string, args: any): Promise<Topic<T> | undefined>;
}


export class SignalRProvider implements ISignalRProvider {
    #hubConnection: Observable<HubConnection>;

    constructor(config: SignalRConfig, getToken: () => Promise<string>) {

        this.#hubConnection = new Observable<HubConnection>((observer) => {
            const connection = new HubConnectionBuilder()
                .withAutomaticReconnect()
                .withUrl(config.url, {
                    accessTokenFactory: async () => await getToken(),
                    timeout: config.timeout
                })
                .build()

            connection.start().then(() => {
                observer.next(connection)
            })
            return () => {
                console.log("close")
                connection.stop()
            }

        }).pipe(shareReplay({ bufferSize: 1, refCount: true }))

    }

    async connect<T>(methodName: string, args: any) {
        try {
            return new Topic<T>(methodName, this.#hubConnection, args);
        } catch (error) {
            console.log(error)
        }
        return;
    }

}

export class Topic<T> extends Observable<T> {
    connection: HubConnection | undefined;

    constructor(public topic: string, public hubConnection: Observable<HubConnection>, args: any[]) {
        super((subscriber) => {
            const hubConnectionSubscription = hubConnection.subscribe((connection) => {
                connection.stream(topic, args);
                const cb = subscriber.next.bind(subscriber);
                connection.on(topic, cb);
                subscriber.add(() => connection.off(topic, cb));
                this.connection = connection
            })
            subscriber.add(() => {
                hubConnectionSubscription.unsubscribe();
            })

        })
    }

    send(...args: any[]): void {
        if (!this.connection) {
            throw new Error("No hub connection awaitable")
        }
        this.connection.send(this.topic, args);
    }

    invoke<T>(...args: any[]): Promise<T> {
        if (!this.connection) {
            throw new Error("No hub connection awaitable")
        }
        return this.connection?.invoke(this.topic, args);
    }

}
