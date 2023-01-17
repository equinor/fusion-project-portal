export interface ISignalRConfigurator {
    config: SignalRConfig,
    createConfig: (config: SignalRConfig) => void
}

export type SignalRConfig = {
    url: string;
    scopes: string[];
    baseUrl?: string
    usePortal?: boolean;
    timeout?: number
}

export class SignalRConfigurator implements ISignalRConfigurator {

    config: SignalRConfig
    constructor() {
        this.config = {
            url: "",
            baseUrl: "",
            scopes: [],
            usePortal: false
        }
    }

    createConfig(config: SignalRConfig) {
        this.config = config
    };
}