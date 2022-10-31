import { useObservable } from '@equinor/portal-utils';
import { useNavigate } from 'react-router-dom';
import { tap } from 'rxjs';
import { workSurfaceController } from '../phases';

const { workSurfaces$, getCurrentWorkSurfaceId } = workSurfaceController;
/**
 * Redirects to last surface
 */
export const useNavigateLastSurface = () => {
  const navigate = useNavigate();
  useObservable(workSurfaces$, (s) =>
    s.pipe(
      tap((surfaces) => {
        const surface = surfaces?.find(
          (s) => s.id === getCurrentWorkSurfaceId()
        )?.name;
        if (surface) {
          navigate(`/${surface.toLowerCase().replace(' ', '-')}`);
        }
      })
    )
  );
};
