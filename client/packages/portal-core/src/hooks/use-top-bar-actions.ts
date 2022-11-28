import { portalTopBarActions } from '../portal-actions/portal-top-bar-actions';
import { PortalTopBarActions } from '../portal-actions/types';

export function useTopBarActions(): PortalTopBarActions {
  return portalTopBarActions;
}
