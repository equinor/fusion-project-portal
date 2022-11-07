import { useFramework } from '@equinor/fusion-framework-react/hooks';
import { WorkSurfaceModule } from '../module';

export const useWorkSurface = () =>
  useFramework<[WorkSurfaceModule]>()['modules']['work-surface']['client'];
