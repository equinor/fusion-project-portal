import { PortalAction, usePortalActions } from '@equinor/portal-core';
import { useEffect, useState } from 'react';

import { StyledScrim, StyledSidesheet } from './PortalSideSheetStyles';

export function PortalSideSheet() {
  const [portalAction, setPortalAction] = useState<PortalAction | undefined>();

  const { activeAction$, closeActiveAction } = usePortalActions();

  useEffect(() => {
    const subscription = activeAction$.subscribe(setPortalAction);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const Component = portalAction?.component;

  return (
    <StyledScrim
      open={!!portalAction}
      onClose={closeActiveAction}
      isDismissable
    >
      <StyledSidesheet>{Component && <Component />}</StyledSidesheet>
    </StyledScrim>
  );
}
