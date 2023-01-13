export interface ISignalRConfigurator {
    config: SignalRConfig,
    createConfig: (config: SignalRConfig) => void
}

export type SignalRConfig = {
    url: string;
    scopes: string[];
    timeout?: number
}

export class SignalRConfigurator implements ISignalRConfigurator {

    config: SignalRConfig
    constructor() {
        this.config = {
            url: "",
            scopes: [],
        }
    }

    createConfig(config: SignalRConfig) {
        this.config = config
    };
}