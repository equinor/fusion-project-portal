import { Typography } from '@equinor/eds-core-react';

import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ServiceMessageList } from './ServiceMessageList';
import { ServiceMessageCard } from './ServiceMessageCard';
import { AppServiceMessage } from '../provider/ServiceMessageProvider';
import { useServiceMessage } from '../query/use-service-message';
import { PortalActionProps } from '@equinor/portal-core';
import SideSheet from '@equinor/fusion-react-side-sheet';

export function ServiceMessages({ action, onClose, open }: PortalActionProps) {
	const { appKey } = useParams();
	return (
		<SideSheet
			isOpen={open}
			onClose={onClose}
			isDismissable={true}
			enableFullscreen={true}
			minWidth={action.minWidth}
		>
			<SideSheet.Indicator color={action.color} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={action.subTitle!} />
			<SideSheet.Content>
				<ServiceMessageWidget appKey={appKey} />
			</SideSheet.Content>
		</SideSheet>
	);
}

interface ServiceMessageWidgetProps {
	appKey?: string;
}

const StyledWrapper = styled.div`
	padding-bottom: 1rem;
	display: flex;
	flex-direction: column;
`;

export const ServiceMessageWidget: FC<ServiceMessageWidgetProps> = ({ appKey }) => {
	const { appsMessages, portalMessages, messages } = useServiceMessage();
	const [compact, setCompact] = useState(false);

	return (
		<>
			<StyledWrapper>
				<Typography variant="h5">Portal ({portalMessages.length})</Typography>
				{portalMessages.length > 0
					? portalMessages.map((message) => <ServiceMessageCard key={message.id} message={message} />)
					: null}
			</StyledWrapper>
			<StyledWrapper>
				<Typography variant="h5">App Status ({messages.filter((a) => a.scope === 'App').length})</Typography>

				{appsMessages.sort(sortCurrentAppToTop(appKey)).map((appMessageGroup) => (
					<ServiceMessageList
						key={appMessageGroup.key}
						messages={appMessageGroup.messages}
						title={appMessageGroup.name}
						currentApp={!appKey || appMessageGroup.key === appKey}
						compact={compact}
					/>
				))}
			</StyledWrapper>
		</>
	);
};

const sortCurrentAppToTop = (appKey: string = '') => {
	return (a: AppServiceMessage, b: AppServiceMessage) => {
		return a.key !== appKey && b.key === appKey ? 1 : -1;
	};
};
