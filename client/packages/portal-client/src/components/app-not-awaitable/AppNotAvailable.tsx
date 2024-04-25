import { PortalMessagePage } from '@equinor/portal-ui';
import { GroupWrapper } from '@portal/components';
import { useNavigate } from 'react-router-dom';
import { ContextProvider, ContextSelector } from '@equinor/portal-core';

import { css } from '@emotion/css';
import { usePortalApps } from '@portal/core';

export const style = {
	paddingTop: css`
		padding-top: 1rem;
	`,
};

type AppNotAwaitableProps = {
	name?: string;
};

export const AppNotAwaitable = ({ name }: AppNotAwaitableProps) => {
	const { appCategories, isLoading } = usePortalApps();

	const navigate = useNavigate();

	return (
		<PortalMessagePage title={`${name || 'Unknown'} is not available for the selected context`} type="Warning">
			<div>
				<ContextProvider>
					<ContextSelector navigate={navigate} />
				</ContextProvider>
				{!isLoading && appCategories && (
					<div>
						<p>Current apps are available for the selected context:</p>
						<div className={style.paddingTop}>
							<GroupWrapper appCategories={appCategories} maxAppsInColumn={10} />
						</div>
					</div>
				)}
			</div>
		</PortalMessagePage>
	);
};
