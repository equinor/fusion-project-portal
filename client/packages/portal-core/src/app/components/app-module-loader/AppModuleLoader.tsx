import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { PortalProgressLoader } from '@equinor/portal-ui';
import { ErrorViewer } from '../error-view/ErrorView';
import { useAppLoader } from '../../hooks/use-app-loader';

interface CurrentAppLoaderProps {
	appKey: string;
}

const Wrapper = styled.section`
	height: calc(100vh - var(--header-height));
	width: 100vw;
`;

const StyledAppSection = styled.section`
	width: 100%;
	z-index: 1;
	overflow: auto;
	position: relative;
	grid-area: content;
	max-width: 100%;
`;

export const AppModuleLoader: FC<CurrentAppLoaderProps> = ({ appKey }) => {
	const ref = useRef<HTMLElement>(null);

	const { loading, error, appRef } = useAppLoader(appKey);

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
		return <ErrorViewer error={error} />;
	}

	if (loading) {
		return (
			<Wrapper>
				<PortalProgressLoader title="Loading App" />
			</Wrapper>
		);
	}

	return <StyledAppSection ref={ref} />;
};
