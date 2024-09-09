import styled from 'styled-components';
import { PortalApp } from '../../types';
import { AppCard } from './AppCard';
import { Loading } from '../Loading';

const Style = {
	CardList: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0 1rem;
		height: calc(100vh - 250px);
		overflow: auto;
	`,
};

export const PortalAppList = ({ portalApps }: { portalApps: PortalApp[] }) => {
	return (
		<Style.CardList>
			{portalApps.map((app) => (
				<AppCard key={app.appKey} app={app} />
			))}
		</Style.CardList>
	);
};
