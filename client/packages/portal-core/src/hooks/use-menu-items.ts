import { useQuery } from 'react-query';
import { from, lastValueFrom, map, switchMap } from 'rxjs';
import { requirePortalClient } from '../clients';
import { WorkSurface } from '../types/portal-config';

/**
 * Fetches menu items based on the current phase
 */
export const useMenuItems = () => {
  const id = '';
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
            map((phase: WorkSurface) => phase.appGroups)
          )
        );
      } else {
        /** Load global apps, doesnt exist yet */
        return [];
      }
    },
    { cacheTime: Infinity, refetchOnWindowFocus: false, staleTime: Infinity }
  );
};
