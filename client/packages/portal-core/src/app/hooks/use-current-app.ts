import { AppModuleProvider } from '@equinor/fusion-framework-module-app';
import { useObservableState } from '@equinor/fusion-observable/react';

export const useCurrentApp = (appProvider: AppModuleProvider) => {
	const state = useObservableState(appProvider.current$);
	return state.value;
};
