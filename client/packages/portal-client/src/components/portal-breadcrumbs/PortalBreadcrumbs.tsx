import { useObservable } from '@equinor/portal-utils';
import { phaseController } from 'packages/portal-core/src/phases/phases';

export const PortalBreadcrumbs = () => {
  const phase = useObservable(phaseController.currentPhase$);
  if (!phase) return null;
  return <div style={{ fontWeight: 500 }}>/ {phase?.title}</div>;
};
