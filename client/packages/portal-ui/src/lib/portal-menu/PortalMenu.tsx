import { PropsWithChildren } from 'react';
import { useMenuContext } from './MenuContext';
import { MenuScrim, MenuWrapper } from './MenuStyles';

export const PortalMenu = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const { menuActive } = useMenuContext();
  return (
    <MenuScrim open={menuActive}>
      <MenuWrapper>{children}</MenuWrapper>
    </MenuScrim>
  );
};

export default PortalMenu;
