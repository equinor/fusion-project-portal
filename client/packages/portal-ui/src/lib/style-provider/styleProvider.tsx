import { EdsProvider, Icon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { GlobalColorStyle } from './globalColors';
import { GlobalStyle } from './globalStyles';

import { theme, ThemeProvider, StylesProvider } from '@equinor/fusion-react-styles';

/** Consider adding the icons you use, Icons used:
 *  - menu
 *
 *  will be changes when all icons are identified!
 */

Icon.add(icons);

const compact = 'compact';

export function StyleProvider({ children }: React.PropsWithChildren) {
	return (
		<EdsProvider>
			<ThemeProvider theme={theme}>
				<StylesProvider seed="project-portal">
					<GlobalStyle />

					<GlobalColorStyle />
					{children}
				</StylesProvider>
			</ThemeProvider>
		</EdsProvider>
	);
}
