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
import { ContextNotAvailableDialog } from '@portal/core';
import styled from 'styled-components';

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
	useBookmarkNavigate({ resolveAppPath: (appKey: string) => `/apps/${appKey}/` });

	return (
		<StyleProvider>
			<ServiceMessageProvider>
				<ServiceMessageService>
					<NotificationService>
						<BookmarkProvider>
							<Styles.Section>
								<ServiceMessageFilter />
								<MainHeader />
								<MenuGroups />
								<ContextNotAvailableDialog allowAllContext={false} />
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
