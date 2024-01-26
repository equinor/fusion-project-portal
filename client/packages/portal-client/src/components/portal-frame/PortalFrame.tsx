import { MenuProvider, ViewProvider } from '@equinor/portal-core';
import { StyleProvider } from '@equinor/portal-ui';
import { ServiceMessageProvider } from '@equinor/service-message';
import { NotificationService, ServiceMessageService } from '@portal/components';
import { Outlet } from 'react-router-dom';
import MainHeader from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';
import { PortalSideSheet } from '../portal-side-sheet';
import { useBookmarkNavigate } from '@equinor/fusion-framework-react-module-bookmark/portal';
import { BookmarkProvider } from '@equinor/fusion-framework-react-components-bookmark';
import { HasContext } from '../context/HasContext';
import { css } from '@emotion/css';
import { ServiceMessageFilter } from '../service-message-filter/ServiceMessageFilter';
import { PeopleResolverProvider } from '@equinor/fusion-framework-react-components-people-provider';

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
	useBookmarkNavigate({ resolveAppPath: (appKey: string) => `/apps/${appKey}/` });

	return (
		<StyleProvider>
			<PeopleResolverProvider>
				<ServiceMessageProvider>
					<ServiceMessageService>
						<NotificationService>
							<BookmarkProvider>
								<ViewProvider>
									<MenuProvider>
										<section className={style}>
											<ServiceMessageFilter />
											<MainHeader />
											<MenuGroups />
											<HasContext />
											<Outlet />
										</section>
									</MenuProvider>
								</ViewProvider>
								<PortalSideSheet />
							</BookmarkProvider>
						</NotificationService>
					</ServiceMessageService>
				</ServiceMessageProvider>
			</PeopleResolverProvider>
		</StyleProvider>
	);
};
