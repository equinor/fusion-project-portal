import WorkSurfaceProvider from '../provider';
import { WorkSurface } from '../types';

export const useWorkSurfaces = () => {
  const module = window.Fusion.modules?.['work-surface'] as WorkSurfaceProvider;

  return {
    setWorkSurface: async (idOrItem?: string | WorkSurface) =>
      await module.setCurrentWorkSurface(idOrItem),
    getCurrentWorkSurface: () => module.currentWorkSurface,
    workSurfaces$: module.workSurfaces$,
    getWorkSurfaces: () => module.workSurfaces,
    currentWorkSurface$: module.currentWorkSurface$,
    resolveWorkSurface: module.resolveWorkSurface,
  };
};
