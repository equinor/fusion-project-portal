import { useQuery } from 'react-query';
import { phases } from '../mock.ts/phases';
import { Phase } from '../types/portal-config';
/**
 * Hook for getting phases from api
 */
export function usePhases() {
  return useQuery<Phase[]>(['Phases'], () => Promise.resolve(phases));
}
