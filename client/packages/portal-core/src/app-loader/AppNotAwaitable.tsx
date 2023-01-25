import { GroupWrapper, PortalMessagePage } from '@equinor/portal-ui';
import { useNavigate } from 'react-router-dom';
import { ContextProvider, ContextSelector } from '../context-selector';
import { useAppGroupsQuery } from '../queries';


import { useAppModule } from './uss-app-module';

export const AppNotAwaitable = () => {
    const { appManifest } = useAppModule()
    const { data, isLoading } = useAppGroupsQuery();
    const navigate = useNavigate()

    return (
        <PortalMessagePage title={`${appManifest?.name} is not awaitable for the selected context`} type="Warning">
            <div>
                
                <ContextProvider>
                    <ContextSelector navigate={navigate} />
                </ContextProvider>
                {!isLoading && data && <div>
                    <p>Current apps are awaitable for the selected context</p>
                    <div><GroupWrapper appGroups={data} /></div>
                </div>}
            </div>
        </PortalMessagePage>);

}