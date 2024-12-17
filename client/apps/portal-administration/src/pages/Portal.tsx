import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { usePortalContext } from '../context/PortalContext';
import { PageMessage } from '../components/PageMessage/PageMessage';
import { useGetPortal } from '../hooks/use-portal-query';
import { PortalHeader } from '../components/Portal/PortalHeader';

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
		height: 100%;
		overflow: hidden;
	`,
};

export const Portal = () => {
	const { portalId } = useParams();
	const navigate = useNavigate();
	const { setActivePortalById, activePortalId } = usePortalContext();

	useEffect(() => {
		if (!portalId || portalId === 'undefined') {
			navigate('/portals');
		} else {
			activePortalId !== portalId && setActivePortalById(portalId);
		}
	}, [portalId, activePortalId, setActivePortalById]);

	const { data: portal } = useGetPortal(portalId);

	if (!portalId) {
		return <PageMessage title="No Portal ID" type="Error" />;
	}

	return (
		<Styles.Wrapper>
			<Styles.Section>
				<PortalHeader portal={portal} />
				<Styles.Content>
					<Outlet />
				</Styles.Content>
			</Styles.Section>
		</Styles.Wrapper>
	);
};

export default Portal;
