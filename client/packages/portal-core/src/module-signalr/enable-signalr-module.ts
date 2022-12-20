import type { IModulesConfigurator } from '@equinor/fusion-framework-module';
import module from './module';

/*
 * ## Enable SignalR Module Fusion Core module
 * - Connect to signalr by id or url / scope
 * - Should support core signalr
 * - Wrapper for post and reserve message 
 * - allow for multiple hubs
 */

export const enableSignalr = (
    configurator: IModulesConfigurator<any, any>,
) => {
    configurator.addConfig({
        module,
        configure: (appConfigurator) => {

        },
    });
}