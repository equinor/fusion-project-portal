import { EdsProvider, Icon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { GlobalColorStyle } from './globalColors';
import { GlobalStyle } from './globalStyles';

/** Consider adding the icons you use, Icons used:
 *  - menu
 *
 *  will be changes when all icons are identified!
 */
console.log(icons);
Icon.add(icons);

const compact = 'compact';

export function StyleProvider({ children }: React.PropsWithChildren) {
  return (
    <EdsProvider>
      <GlobalStyle />

      <GlobalColorStyle />
      {children}
    </EdsProvider>
  );
}
