import signalr from "@microsoft/signalr"

export interface ISignalRProvider {

}

export type SignalRConfig = {
    url: string;
    scope: string[];
    timeout?: number
}

export class SignalRProver implements ISignalRProvider {
    #hubConnection: signalr.HubConnection;

    constructor(config: SignalRConfig, getToken: () => Promise<string>) {
        this.#hubConnection = new signalr.HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl(config.url, {
                accessTokenFactory: async () => await getToken(),
                timeout: config.timeout
            })
            .build()

        this.init()
    }


    private async init() {
        try {
            await this.#hubConnection.start()
        } catch (error: unknown) {
            throw Error("Was not able to start hubConnection")
        }
    }

    on() {
        this.#hubConnection.on()
        this.#hubConnection.send
    }

}