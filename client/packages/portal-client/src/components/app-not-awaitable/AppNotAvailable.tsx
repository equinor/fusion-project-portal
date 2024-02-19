import { GroupWrapper, PortalMessagePage } from '@equinor/portal-ui';
import { useNavigate } from 'react-router-dom';
import { ContextProvider, ContextSelector, useViewController } from '@equinor/portal-core';

import { css } from '@emotion/css';
import { useApps } from '@portal/core';

export const style = {
	paddingTop: css`
		padding-top: 1rem;
	`,
};

type AppNotAwaitableProps = {
	name?: string;
};

export const AppNotAwaitable = ({ name }: AppNotAwaitableProps) => {
	const { appGroups, isLoading } = useApps();

	const navigate = useNavigate();

	return (
		<PortalMessagePage title={`${name || 'Unknown'} is not available for the selected context`} type="Warning">
			<div>
				<ContextProvider>
					<ContextSelector navigate={navigate} />
				</ContextProvider>
				{!isLoading && appGroups && (
					<div>
						<p>Current apps are available for the selected context:</p>
						<div className={style.paddingTop}>
							<GroupWrapper appGroups={appGroups} maxAppsInColumn={10} />
						</div>
					</div>
				)}
			</div>
		</PortalMessagePage>
	);
};
