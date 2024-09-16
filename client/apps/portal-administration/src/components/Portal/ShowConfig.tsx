import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetPortal } from '../../hooks/use-portal-query';
import { usePortalApps } from '../../hooks/use-portal-apps';
import { Card } from '@equinor/eds-core-react';
import { Message } from '../Message';
import { Code } from '../../utils/syntaxHighlightJson';

const Style = {
	Wrapper: styled.div`
		padding: 1rem 0;
		display: flex;
		width: 100%;
		flex-direction: column;
	`,
	Content: styled.div`
		padding: 1rem;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	`,
};

export const ShowConfigPage: React.FC = () => {
	const { portalId } = useParams();

	const { data } = useGetPortal(portalId);
	const { data: apps } = usePortalApps(portalId);

	const portal = { ...data };
	if (portal) {
		delete portal.contexts;
	}

	const config = {
		...portal,

		configuration: {
			router: JSON.parse((portal as any)?.configuration?.router || '{}'),
		},
		apps: portal.contexts && portal.contexts.length > 0 ? apps : [],
	};

	return (
		<Style.Wrapper>
			<Card>
				<Style.Content>
					<Message
						title="Configuration"
						messages={['This is used for developers to ensure the configuration is proper']}
					/>
				</Style.Content>
			</Card>

			<Code config={config} />
		</Style.Wrapper>
	);
};
