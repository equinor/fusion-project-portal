import { useObservableState } from '@equinor/fusion-observable/react';
import { useFrameworkContext } from './use-framework-context';

export const useFrameworkCurrentContext = () => {
  const provider = useFrameworkContext();
  return useObservableState(provider.contextClient.currentContext$);
};
