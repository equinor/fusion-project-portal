import { useQuery } from 'react-query';
import { from, lastValueFrom, map, switchMap } from 'rxjs';
import { requirePortalClient } from '../clients';
import { useCurrentWorkSurface, WorkSurface } from '../work-surface-module';

/**
 * Fetches menu items based on the current phase
 */
export const useMenuItems = () => {
  const surface = useCurrentWorkSurface();
  return useQuery(
    ['menu-items', surface?.id],
    async () => {

      if (surface?.id) {
        return lastValueFrom(
          from(requirePortalClient()).pipe(
            switchMap((s) =>
              s.fetch$(
                `https://app-pep-backend-noe-dev.azurewebsites.net/api/work-surfaces/${surface.id}`
              )
            ),
            switchMap((res) => res.json()),
            map((workSurface: WorkSurface) => workSurface.appGroups)
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
