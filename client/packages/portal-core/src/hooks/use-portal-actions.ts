import { portalActions } from '../portal-actions/portal-actions';
import { PortalActions } from '../portal-actions/types';

export function usePortalActions(): PortalActions {
  return portalActions;
}
