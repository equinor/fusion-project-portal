import { Icon } from '@equinor/eds-core-react';
import { PortalAction, usePortalActions } from '@equinor/portal-core';
import { Resizable } from 're-resizable';
import { useEffect, useState } from 'react';

import { StyledScrim, StyledSidesheet, StyledSidesheetWrapper } from './PortalSideSheetStyles';


const MIN_WIDTH = 500;

export function PortalSideSheet() {
  const [portalAction, setPortalAction] = useState<PortalAction | undefined>();

  const { activeAction$, closeActiveAction } = usePortalActions();

  const [width, setWidth] = useState(MIN_WIDTH)

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
      <StyledSidesheetWrapper>
        <Resizable
          size={{ width, height: '100%' }}
          maxWidth={'100vw'}
          minWidth={MIN_WIDTH}
          onResizeStop={(e, direction, ref, d) => {
            e.stopPropagation()
            e.stopImmediatePropagation()
            setWidth(width + d.width);

          }}
          handleComponent={{
            left: <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="7.21924" y="21.274" width="17" height="2" transform="rotate(-90 7.21924 21.274)" fill="#6F6F6F" />
              <rect x="11.2192" y="21.274" width="17" height="2" transform="rotate(-90 11.2192 21.274)" fill="#6F6F6F" />
            </svg>
          }}
          handleStyles={{
            left: {
              position: "absolute",
              top: "45%",
              left: "1px"

            }
          }} >
          <StyledSidesheet>
            {Component && <Component />}
          </StyledSidesheet>
        </Resizable>
      </StyledSidesheetWrapper>
    </StyledScrim>
  );
}
