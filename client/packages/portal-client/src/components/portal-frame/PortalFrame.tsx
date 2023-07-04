import { MenuProvider, ViewProvider } from '@equinor/portal-core';
import { StyleProvider } from '@equinor/portal-ui';
import { NotificationService, ServiceMessageProvider } from '@equinor/service-message';
import { Outlet } from 'react-router-dom';
import MainHeader from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';
import { PortalSideSheet } from '../portal-side-sheet';
import { useBookmarkNavigate } from '@equinor/fusion-framework-react-module-bookmark/portal';
import { BookmarkProvider } from '@equinor/fusion-framework-react-components-bookmark';
import { css } from '@emotion/css';

const style = css`
	width: 100vw;
	height: 100vh;
	display: grid;
	overflow: auto;
	grid-template-rows: var(--header-height) calc(100% - var(--header-height));
	grid-template-areas:
		'header'
		'content';
`;

export const PortalFrame = () => {
	useBookmarkNavigate({ resolveAppPath: (appKey: string) => `/apps/${appKey}` });

	return (
		<StyleProvider>
			<ServiceMessageProvider>
				<NotificationService>
					<BookmarkProvider>
						<ViewProvider>
							<MenuProvider>
								<section className={style}>
									<MainHeader />
									<MenuGroups />
									<Outlet />
								</section>
							</MenuProvider>
						</ViewProvider>
						<PortalSideSheet />
					</BookmarkProvider>
				</NotificationService>
			</ServiceMessageProvider>
		</StyleProvider>
	);
};
