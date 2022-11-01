import { useQuery } from 'react-query';
import { from, lastValueFrom, map, of, switchMap } from 'rxjs';
import { requirePortalClient } from '../clients';
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
        return lastValueFrom(
          from(requirePortalClient()).pipe(
            switchMap((s) =>
              s.fetch$(
                `https://app-pep-backend-noe-dev.azurewebsites.net/api/work-surfaces/${id}`
              )
            ),
            switchMap((res) => res.json()),
            map((phase: Phase) => phase.appGroups)
          )
        );
      } else {
        /**Load global apps, doesnt exist yet */
        return [];
      }
    },
    { cacheTime: Infinity, refetchOnWindowFocus: false, staleTime: Infinity }
  );
};
