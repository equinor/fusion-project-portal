import { useMenuContext } from '@equinor/portal-core';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { MenuScrim, MenuWrapper } from './MenuStyles';

export const PortalMenu = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
	const { menuActive, closeMenu } = useMenuContext();
	return (
		<MenuScrim open={menuActive} isDismissable onClose={closeMenu}>
			<MenuWrapper style={{ width: '1100px' }}>{children}</MenuWrapper>
		</MenuScrim>
	);
};

export default PortalMenu;
