import { portalActions } from './portal-actions';
import { PortalActions } from './types';

export function usePortalActions(): PortalActions {
  return portalActions;
}
