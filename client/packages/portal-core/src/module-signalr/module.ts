import { Module } from "@equinor/fusion-framework-module";
import { MsalModule } from '@equinor/fusion-framework-module-msal';
import { ISignalRConfigurator, SignalRConfigurator } from "./configurator";

import { ISignalRProvider, SignalRProvider } from "./provider";

export type SignalRModuleKey = "signalr";

export const moduleKey = "signalr";

export type SignalRModule = Module<
    SignalRModuleKey,
    ISignalRProvider,
    ISignalRConfigurator,
    [MsalModule]
>;

export const module: SignalRModule = {
    name: moduleKey,
    configure: () => new SignalRConfigurator(),
    initialize: async (args) => {
        const config = (args.config as ISignalRConfigurator).config;

        const { hasModule, requireInstance } = args;
        if (!hasModule("auth")) {
            throw Error("Todo")
        }

        const authProvider = await requireInstance("auth");
        const acquireAccessToken = async () => {
            return await authProvider.acquireAccessToken({
                scopes: config.scopes
            }) || "";

        }
        return new SignalRProvider(config, acquireAccessToken)
    }
}

export default module;

declare module '@equinor/fusion-framework-module' {
    interface Modules {
        signalr: SignalRModule;
    }
}
