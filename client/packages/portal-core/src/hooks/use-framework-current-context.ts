import { ContextItem } from '@equinor/fusion-framework-module-context';
import { useObservableState } from '@equinor/fusion-observable/react';
import { useFrameworkContext } from './use-framework-context';

export const useFrameworkCurrentContext = <TType extends Record<string, unknown>>() => {
  const provider = useFrameworkContext();
  return useObservableState(provider.contextClient.currentContext$) as ContextItem<TType>;
};
