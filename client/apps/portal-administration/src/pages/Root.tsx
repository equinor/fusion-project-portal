import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SideMenu from '../components/SideMenu';
import { PortalContextComponent } from '../context/PortalContext';
import { Snack } from '../components/Snack';
import { useAccess } from '../hooks/use-access';
import { Loading } from '../components/Loading';
import { PageMessage } from '../components/PageMessage/PageMessage';
import { Typography } from '@equinor/eds-core-react';
import { LandingPage } from './LandingPage';

const Styles = {
	Content: styled.div`
		flex: 1;
		position: relative;
		overflow: auto;
		overflow-x: hidden;
	`,
	Section: styled.section`
		display: flex;
		height: inherit;
	`,
	Wrapper: styled.div`
		display: block;
		height: inherit;
		width: 100%;
	`,
};

export const Root = () => {
	const { isLoading, data: hasAccess } = useAccess();

	if (isLoading) return <Loading detail="Checking Access" />;

	if (!hasAccess) {
		return (
			<Styles.Wrapper>
				<PortalContextComponent>
					<Styles.Section>
						<Snack />
						<SideMenu />
						<Styles.Content>
							<Outlet />
						</Styles.Content>
					</Styles.Section>
				</PortalContextComponent>
			</Styles.Wrapper>
		);
	}
	return <LandingPage />;
};
