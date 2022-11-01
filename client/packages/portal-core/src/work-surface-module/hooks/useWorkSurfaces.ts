import { useObservable } from '@equinor/portal-utils';
import { useWorkSurface } from './useWorkSurface';

export function useWorkSurfaces() {
  const { workSurfaces$ } = useWorkSurface();
  return useObservable(workSurfaces$);
}
