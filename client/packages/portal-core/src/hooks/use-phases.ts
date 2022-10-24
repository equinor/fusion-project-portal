import { Fusion } from '@equinor/fusion-framework-react';
import { useFramework } from '@equinor/fusion-framework-react/hooks';
import { WorkSurfaces } from '../types/portal-config';
export function usePhases() {
  const { modules } = useFramework() as Fusion<
    [{ name: 'phase'; initialize: () => { phases: WorkSurfaces[] } }]
  >;

  return modules.phase.phases as WorkSurfaces[];
}
