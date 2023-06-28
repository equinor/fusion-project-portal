import { ContextProvider, PortalContextSelector, useViewController } from '@equinor/portal-core';
import { FullPageLoading } from '@equinor/portal-ui';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './ViewPage.Styles';
import { PasePageHeader } from './ViewPageHeader';

import { ViewContextAvailableDialog } from './ViewContextAvailableDialog';
import { Typography } from '@equinor/eds-core-react';

export const ViewPage = (): JSX.Element => {
	const { isLoading, currentView } = useViewController();

	if (isLoading) return <FullPageLoading detail="Loading view" />;
	//TODO: Make component
	if (!currentView) return <div>Something went wrong no view percent</div>;

	return (
		<StyledMain>
			<ContextProvider>
				<StyledBackgroundSection>
					<StyledContentSection>
						<PasePageHeader {...currentView} />
						<StyledContentWrapper>
							<Typography>
								Please select a {currentView.name.toLowerCase()} from the search field to proceed.
							</Typography>
							<PortalContextSelector path={`/${currentView.key}`} title={currentView.name} />
							<ViewContextAvailableDialog title={currentView.name} />
						</StyledContentWrapper>
					</StyledContentSection>
				</StyledBackgroundSection>
			</ContextProvider>
		</StyledMain>
	);
};
