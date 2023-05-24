import { useMenuContext } from '@equinor/portal-core';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { MenuScrim, MenuWrapper } from './MenuStyles';

interface PortalMenuProps {
  width: number;
}

export const PortalMenu = ({ width, children }: PropsWithChildren<PortalMenuProps>): JSX.Element => {
  const { menuActive, closeMenu } = useMenuContext();
  return (
    <MenuScrim open={menuActive} isDismissable onClose={closeMenu}>
      <MenuWrapper style={{ width: `${width}px` }}>{children}</MenuWrapper>
    </MenuScrim>
  );
};

export default PortalMenu;
