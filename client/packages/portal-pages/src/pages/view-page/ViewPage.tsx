import { ContextProvider, PortalContextSelector, useViewController } from '@equinor/portal-core';
import { FullPageLoading, PortalMessagePage } from '@equinor/portal-ui';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection } from './ViewPage.Styles';
import { PasePageHeader } from './ViewPageHeader';

import { ViewContextAvailableDialog } from './ViewContextAvailableDialog';
import { Typography } from '@equinor/eds-core-react';
import { css } from '@emotion/css';

const styles = {
	contentSection: css`
		padding: 20rem 5rem 0rem 5rem;

		@media only screen and (max-width: 60rem) {
			padding: 20rem 2rem 2rem 2rem;
		}
		@media only screen and (max-width: 45rem) {
			padding: 5rem 1rem 1rem 1rem;
		}
	`,
	contentWrapper: css`
		display: flex;
		flex-direction: column;
		padding: 2rem 0rem;
		gap: 1rem;
	`,
	viewDescription: css`
		width: 50vw;
	`,
};

export const ViewPage = (): JSX.Element => {
	const { isLoading, currentView } = useViewController();

	if (isLoading) return <FullPageLoading detail="Loading view" />;

	if (!currentView) {
		return (
			<PortalMessagePage type={'Error'} title="Something went wrong">
				<Typography>There is no view percent</Typography>
			</PortalMessagePage>
		);
	}

	return (
		<StyledMain>
			<ContextProvider>
				<StyledBackgroundSection>
					<StyledContentSection>
						<PasePageHeader {...currentView} />
						<div className={styles.contentWrapper}>
							<p className={styles.viewDescription}>
								Please choose a {currentView.name.toLowerCase()} from the search field to continue. This
								will direct you to the {currentView.name.toLowerCase()}'s homepage, where you can access
								the applications associated with the selected {currentView.name.toLowerCase()} through
								the menu.
							</p>
							<PortalContextSelector path={`/${currentView.key}`} title={currentView.name} />
							<ViewContextAvailableDialog title={currentView.name} />
						</div>
					</StyledContentSection>
				</StyledBackgroundSection>
			</ContextProvider>
		</StyledMain>
	);
};
