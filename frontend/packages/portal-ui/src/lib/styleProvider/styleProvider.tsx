import { EdsProvider, Icon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { GlobalColorStyle } from './globalColors';
import { GlobalStyle } from './gobalStyles';

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
