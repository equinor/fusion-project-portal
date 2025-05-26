import { StyleProvider } from '@equinor/portal-ui';
import { ServiceMessageProvider } from '@equinor/service-message';
import { NotificationService, ServiceMessageService } from '@portal/components';
import { Outlet } from 'react-router-dom';
import MainHeader from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';
import { PortalSideSheet } from '../portal-side-sheet';
import { useBookmarkNavigate } from '@equinor/fusion-framework-react-module-bookmark/portal';
import { BookmarkProvider } from '@equinor/fusion-framework-react-components-bookmark';
import { ServiceMessageFilter } from '../service-message-filter/ServiceMessageFilter';
import styled from 'styled-components';
import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';
import { useCurrentApp } from '@equinor/fusion-framework-react/app';
import { useFramework } from '@equinor/fusion-framework-react';
import { BookmarkModule } from '@equinor/fusion-framework-react-module-bookmark';

const Styles = {
	Section: styled.section`
		width: 100vw;
		height: 100vh;
		display: grid;
		overflow: auto;
		grid-template-rows: var(--header-height) calc(100% - var(--header-height));
		grid-template-areas:
			'header'
			'content';
	`,
};

export const PortalFrame = () => {
	const currentUser = useCurrentUser();
	const { currentApp} = useCurrentApp();
	const {bookmark: bookmarkProvider} = useFramework<[BookmarkModule]>().modules;

	useBookmarkNavigate({ resolveAppPath: (appKey: string) => `/apps/${appKey}/` });

	return (
		<StyleProvider>
			<ServiceMessageProvider>
				<ServiceMessageService>
					<NotificationService>
						<BookmarkProvider provider={bookmarkProvider} currentUser={currentUser ? { id: currentUser.localAccountId, name: currentUser.name } : undefined} currentApp={currentApp ? { appKey: currentApp.appKey, name: currentApp.manifest?.displayName } : undefined}>
							<Styles.Section>
								<ServiceMessageFilter />
								<MainHeader />
								<MenuGroups />
								<Outlet />
							</Styles.Section>
							<PortalSideSheet />
						</BookmarkProvider>
					</NotificationService>
				</ServiceMessageService>
			</ServiceMessageProvider>
		</StyleProvider>
	);
};
