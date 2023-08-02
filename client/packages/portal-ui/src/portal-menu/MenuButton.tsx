import { Button, Icon } from '@equinor/eds-core-react';
import { useMenuContext } from '@equinor/portal-core';

export function MenuButton(): JSX.Element {
  const { toggleMenu, menuActive } = useMenuContext();
  return (
    <Button variant="ghost_icon" aria-label="open menu" onClick={toggleMenu}>
      <Icon name={menuActive ? 'close' : 'menu'} />
    </Button>
  );
}
