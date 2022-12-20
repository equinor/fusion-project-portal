import { AppModule } from "@equinor/fusion-framework-module-app"
import { useFramework } from "@equinor/fusion-framework-react"
import { useObservableState } from "@equinor/fusion-observable/react";

export const useAppModule = () => {
    const fusion = useFramework<[AppModule]>()
    const currentApp = useObservableState(fusion.modules.app.current$);
    return {
        app: fusion.modules.app,
        fusion,
        currentApp
    };
}