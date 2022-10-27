import { useObservable } from '@equinor/portal-utils';
import { useNavigate } from 'react-router-dom';
import { workSurfaceController } from '../phases/phases';
import { Phase } from '../types/portal-config';
/**
 * Hook for getting phases from api
 */
export function usePhases() {
  const navigate = useNavigate();
  const {
    clearWorkSurface,
    currentWorkSurface$: currentWorkSurface$,
    workSurfaces$,
    setWorkSurface,
  } = workSurfaceController;

  const workSurfaces = useObservable(workSurfaces$);

  const currentWorkSurface = useObservable(currentWorkSurface$);

  return {
    clearWorkSurface: (preventRedirect?: boolean) => {
      clearWorkSurface();
      if (preventRedirect) return;
      navigate('/');
    },
    setWorkSurface: (workSurface: Phase, preventRedirect?: boolean) => {
      setWorkSurface(workSurface);
      if (preventRedirect) return;
      navigate(`/${workSurface.name.toLowerCase().replace(' ', '-')}`);
    },
    phases: workSurfaces,
    currentWorkSurface,
  };
}
