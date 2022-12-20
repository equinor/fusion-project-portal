import { Module } from "@equinor/fusion-framework-module";

export type SignalRModuleKey = "signalr";

interface ISignalRProvider { }

interface ISignalRConfigurator { }


export const moduleKey = "signalr";

export type SignalRModule = Module<
    SignalRModuleKey,
    ISignalRProvider,
    ISignalRConfigurator,
    []
>;

export const module: SignalRModule = {
    name: moduleKey,
    configure: () => { return {} },
    initialize: () => {
        return {}
    }
}

export default module;

declare module '@equinor/fusion-framework-module' {
    interface Modules {
        signalr: SignalRModule;
    }
}
