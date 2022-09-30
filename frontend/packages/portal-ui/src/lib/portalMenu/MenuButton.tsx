import { Button, Icon } from '@equinor/eds-core-react';
import { useMenuContext } from './MenuContext';

export function MenuButton(): JSX.Element {
  const { toggleMenu, menuActive } = useMenuContext();
  return (
    <Button variant="ghost_icon" aria-label="open menu" onClick={toggleMenu}>
      <Icon name={menuActive ? 'close' : 'menu'} />
    </Button>
  );
}
