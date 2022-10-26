import { useObservable } from '@equinor/portal-utils';
import { useMemo } from 'react';
import { phaseController } from '../phases/phases';
/**
 * Hook for getting phases from api
 */
export function usePhases() {
  const { clearSelectedPhase, currentPhase$, phases$, setActivePhase } =
    phaseController;

  const phases = useObservable(phases$);

  const currentPhase = useObservable(currentPhase$);

  return {
    clearSelectedPhase,
    setActivePhase,
    phases,
    currentPhase,
  };
}
