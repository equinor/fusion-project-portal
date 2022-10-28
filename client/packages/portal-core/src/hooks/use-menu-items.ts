import { useQuery } from 'react-query';
import { Phase } from '../types/portal-config';
import { usePhases } from './use-phases';

/**
 * Fetches menu items based on the current phase
 */
export const useMenuItems = () => {
  const id = usePhases().currentWorkSurface?.id;
  return useQuery(
    ['menu-items', id],
    async () => {
      if (id) {
        const res = await fetch(
          `https://app-pep-backend-noe-dev.azurewebsites.net/api/work-surfaces/${id}`
        );
        return ((await res.json()) as Phase).appGroups;
      } else {
        return [];
      }
    },
    { cacheTime: Infinity, refetchOnWindowFocus: false, staleTime: Infinity }
  );
};
