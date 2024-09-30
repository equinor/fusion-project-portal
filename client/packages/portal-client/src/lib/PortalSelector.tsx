import { Button, Card, Icon, List } from '@equinor/eds-core-react';
import { settings } from '@equinor/eds-icons';
import { useState } from 'react';
import { styled } from 'styled-components';

import { useQuery } from 'react-query';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const Styles = {
	Selector: styled.div`
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		width: 100%;
		z-index: 2000;
	`,
	List: styled.div`
		position: absolute;
		left: 50px;
		bottom: 0;
		display: flex;
		flex-direction: row;
		gap: 1rem;
	`,
};

export type Portal = {
	name: string;
	shortName: string;
	id: string;
	key: string;
};

const usePortals = () => {
	const client = useHttpClient('portal-client');

	return useQuery<Portal[]>({
		queryKey: ['portals'],
		queryFn: async () => await client.fetch('api/portals').then((res) => res.json()),
	});
};

export const PortalSelector = () => {
	const [showSettings, setShowSettings] = useState(false);
	const { data } = usePortals();

	if (process.env.NODE_ENV === 'production') return null;

	window.setPortal = (portalId: string) => {
		localStorage.setItem('portalId', portalId);
		window.location.replace('/');
		window.location.reload();
	};

	window.clearPortal = () => {
		localStorage.removeItem('portalId');
		window.location.replace('/');
		window.location.reload();
	};
	window.togglePortalSelector = () => {
		const showSettings = localStorage.getItem('showPortalSettings');
		if (!showSettings || showSettings === 'false') {
			localStorage.setItem('showPortalSettings', 'true');
		} else {
			localStorage.setItem('showPortalSettings', 'false');
		}
	};

	if (localStorage.getItem('showPortalSettings') === 'true') {
		return (
			<Styles.Selector>
				{showSettings && (
					<Styles.List>
						{data?.map((portal) => (
							<Button key={portal.id} onClick={() => window.setPortal(portal.id)}>
								{portal.name}
							</Button>
						))}
						<Button onClick={() => window.clearPortal()}>Clear Portal</Button>
					</Styles.List>
				)}
				<Button variant="ghost_icon" onClick={() => setShowSettings((s) => !s)}>
					<Icon data={settings}></Icon>
				</Button>
			</Styles.Selector>
		);
	}
	return null;
};

declare global {
	interface Window {
		setPortal: (portalId: string) => void;
		clearPortal: () => void;
		togglePortalSelector: () => void;
	}
}
