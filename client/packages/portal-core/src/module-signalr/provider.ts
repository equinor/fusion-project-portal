
import { HubConnectionBuilder, HubConnection, IStreamResult, HubConnectionState } from "@microsoft/signalr"
import { Observable } from "rxjs";
import { SignalRConfig } from "./configurator";

export interface ISignalRProvider {
    // start(): Promise<boolean>;
    stop(): void;
    connect<T>(methodName: string, args: any): Topic<T> | undefined;
}


export class SignalRProvider implements ISignalRProvider {
    #hubConnection: HubConnection;


    constructor(config: SignalRConfig, getToken: () => Promise<string>) {
        this.#hubConnection = new HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl(config.url, {
                accessTokenFactory: async () => await getToken(),
                timeout: config.timeout
            })
            .build()

        this.start()
    }

    private async start() {
        try {
            await this.#hubConnection.start()
            return true
        } catch (error: unknown) {
            throw Error("Was not able to start hubConnection")
        }
    }

    stop() {
        try {
            this.#hubConnection.stop()
        } catch (error: unknown) {
            throw Error("Was not able to stop hubConnection")
        }
    }

    connect<T>(methodName: string, args: any) {
        try {
            return new Topic<T>(methodName, this.#hubConnection, args);
        } catch (error) {
            console.log(error)
        }
        return;
    }

}

export class Topic<T> extends Observable<T> {
    constructor(public topic: string, public connection: HubConnection, args: any[]) {
        super((subscriber) => {
            const hubStream = connection.stream(topic, args);
            const cb = subscriber.next.bind(subscriber);
            connection.on(topic, cb);
            subscriber.add(() => connection.off(topic, cb));
        })
    }

    send(...args: any[]): void {
        this.connection.send(this.topic, args);
    }

    invoke<T>(...args: any[]): Promise<T> {
        return this.connection.invoke(this.topic, args);
    }

    close() {
        this.connection.stop()
    }
}
