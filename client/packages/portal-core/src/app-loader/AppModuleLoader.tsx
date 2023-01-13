import { FC, useEffect, useRef, } from 'react';
import styled from 'styled-components';
import { PortalProgressLoader } from '@equinor/portal-ui';
import { ErrorViewer } from './ErrorView';
import { useAppLoader } from './use-app-loader';
import { AppNotAwaitable } from './AppNotAwaitable';
import { useCurrentAppGroup } from '../hooks';

interface CurrentAppLoaderProps {
    appKey: string;
}

const Wrapper = styled.section`
    height: calc(100vh - 48px);
    width: 100vw;
`;

const StyledAppSection = styled.section`
    flex: 1 1 auto;
    overflow: auto;
`;

export const AppModuleLoader: FC<CurrentAppLoaderProps> = ({ appKey }) => {
    const ref = useRef<HTMLElement>(null);
    const { loading, error, appRef } = useAppLoader(appKey);
    const { currentAppGroup } = useCurrentAppGroup(appKey)

    useEffect(() => {
        const refEl = ref.current;
        const appEl = appRef.current;
        if (!(appEl && refEl)) {
            return;
        }

        refEl.appendChild(appEl);
        return () => {
            try {
                refEl.removeChild(appEl);
            } catch (err) {
                console.error(err);
            }
        };
    }, [ref.current, appRef.current]);

    if (error) {
        return (
            <ErrorViewer error={error} />
        );
    }

    if (loading) {
        return <Wrapper>
            <PortalProgressLoader title="Loading App" />
        </Wrapper>
    }

    if (!currentAppGroup) {
        return <AppNotAwaitable />;
    }

    return <StyledAppSection ref={ref} />;
};

export default AppModuleLoader;