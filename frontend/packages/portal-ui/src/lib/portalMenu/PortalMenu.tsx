import { PropsWithChildren } from 'react';
import { useMenuContext } from './MenuContext';
import { MenuScrim, MenuWrapper, Wrapper } from './MenuStyles';

export const PortalMenu = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const { menuActive } = useMenuContext();
  return (
    <Wrapper>
      <MenuScrim open={menuActive}>
        <MenuWrapper>{children}</MenuWrapper>
      </MenuScrim>
    </Wrapper>
  );
};

export default PortalMenu;
