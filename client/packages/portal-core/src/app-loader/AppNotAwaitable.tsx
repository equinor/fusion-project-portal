import { GroupWrapper, PortalMessagePage } from '@equinor/portal-ui';
import { useNavigate } from 'react-router-dom';
import { ContextProvider, ContextSelector } from '../context-selector';
import { useViewController } from '../providers';
import { useAppGroupsQuery } from '../queries';

type AppNotAwaitableProps = {
	name: string;
};

export const AppNotAwaitable = ({ name }: AppNotAwaitableProps) => {
	const { data, isLoading } = useAppGroupsQuery();
	const { currentView } = useViewController();
	const navigate = useNavigate();

	return (
		<PortalMessagePage title={`${name} is not awaitable for the selected context`} type="Warning">
			<div>
				<ContextProvider>
					<ContextSelector navigate={navigate} path={`/${currentView?.key}`} />
				</ContextProvider>
				{!isLoading && data && (
					<div>
						<p>Current apps are available for the selected context</p>
						<div>
							<GroupWrapper appGroups={data} />
						</div>
					</div>
				)}
			</div>
		</PortalMessagePage>
	);
};
