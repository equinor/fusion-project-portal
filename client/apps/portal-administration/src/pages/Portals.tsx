import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { PortalsHeader } from '../components/Portals/PortalsHeader';
import { PortalList } from './PortalsList';

const Styles = {
	Content: styled.div`
		display: flex;
		width: 100%;
		height: 100%;
	`,
	Section: styled.section`
		flex-direction: column;
		padding: 1rem;
		display: flex;
		height: 100%;
	`,
	Wrapper: styled.div`
		display: block;
		overflow: hidden;
		height: 100%;
	`,
};

export const Portals = () => {
	return (
		<Styles.Wrapper>
			<Styles.Section>
				<PortalsHeader />
				<Styles.Content>
					<Outlet />
				</Styles.Content>
			</Styles.Section>
		</Styles.Wrapper>
	);
};
