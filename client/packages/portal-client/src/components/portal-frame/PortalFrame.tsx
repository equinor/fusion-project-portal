import { MenuProvider, ViewProvider } from '@equinor/portal-core';
import { PortalSideSheet, StyleProvider } from '@equinor/portal-ui';
import { NotificationService, ServiceMessageProvider } from '@equinor/service-message';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainHeader from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';
export const PortalFrame = () => {
	return (
		<StyleProvider>
			<StyledWrapper>
				<ServiceMessageProvider>
					<NotificationService>
						<ViewProvider>
							<MenuProvider>
								<MainHeader />
								<MenuGroups />
								<Outlet />
							</MenuProvider>
							<PortalSideSheet />
						</ViewProvider>
					</NotificationService>
				</ServiceMessageProvider>
			</StyledWrapper>
		</StyleProvider>
	);
};

const StyledWrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;
