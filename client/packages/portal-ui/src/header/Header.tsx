import React from 'react';
import { Breadcrumbs } from './breadcrumbs/Breadcrumbs';
import { TopBarActions } from '../top-bar-actions';

import { PortalLogo } from './Logo';
import { StyledActionsWrapper, StyledCustomContent, StyledHeader, StyledTopBar } from './HeaderStyles';
import { TopBarContextSelector, ContextProvider } from './HeaderContextSelector';

interface PortalHeaderProps {
	MenuButton: React.FC;
	title: string;
	onLogoClick: () => void;
}

export function Header({ MenuButton, title, onLogoClick }: PortalHeaderProps): JSX.Element {
	return (
		<ContextProvider>
			<StyledTopBar>
				<StyledHeader>
					<MenuButton />
					<PortalLogo title={title} onClick={onLogoClick} />
				</StyledHeader>
				<StyledCustomContent>
					<Breadcrumbs />
					<TopBarContextSelector />
				</StyledCustomContent>
				<StyledActionsWrapper>
					<TopBarActions />
				</StyledActionsWrapper>
			</StyledTopBar>
		</ContextProvider>
	);
}

export default Header;
