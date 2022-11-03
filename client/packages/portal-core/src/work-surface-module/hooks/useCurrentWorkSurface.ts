import { useObservable } from '@equinor/portal-utils';
import { useWorkSurface } from './useWorkSurface';

export function useCurrentWorkSurface() {
  const { currentWorkSurface$ } = useWorkSurface();
  return useObservable(currentWorkSurface$);
}
