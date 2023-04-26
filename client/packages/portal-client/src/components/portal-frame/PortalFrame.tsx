import { MenuProvider, ViewProvider } from '@equinor/portal-core';
import { StyleProvider } from '@equinor/portal-ui';
import { NotificationService, ServiceMessageProvider } from '@equinor/service-message';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainHeader from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';
import { PortalSideSheet } from '../portal-side-sheet';
import { useBookmarkNavigate } from '@equinor/fusion-framework-react-module-bookmark/portal';
import { BookmarkProvider } from '@equinor/fusion-framework-react-components-bookmark';

export const PortalFrame = () => {
	useBookmarkNavigate({ resolveAppPath: (appKey: string) => `/apps/${appKey}` });

	return (
		<StyleProvider>
			<StyledWrapper>
				<ServiceMessageProvider>
					<NotificationService>
						<BookmarkProvider>
							<ViewProvider>
								<MenuProvider>
									<MainHeader />
									<MenuGroups />
									<Outlet />
								</MenuProvider>
							</ViewProvider>
							<PortalSideSheet />
						</BookmarkProvider>
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
