import { Icon, Typography } from '@equinor/eds-core-react';

import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ServiceMessageList } from './ServiceMessageList';

import { useServiceMessage } from '../hooks/use-service-message';
import { PortalActionProps } from '@equinor/portal-core';
import SideSheet from '@equinor/fusion-react-side-sheet';
import { AppServiceMessage } from '../types/types';
import { PortalMessage } from '@portal/ui';
import Tooltip from '@equinor/fusion-react-tooltip';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ServiceMessageTooltip } from './ServiceMessageIcon';

export function ServiceMessages({ action, onClose, open }: PortalActionProps) {
	const { appKey } = useParams();
	const subTitle = action.subTitle || '';
	return (
		<SideSheet isOpen={open} onClose={onClose} isDismissable={true} minWidth={action.minWidth}>
			<SideSheet.Indicator color={action.color} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={subTitle} />
			<SideSheet.Content>
				<ServiceMessageWidget appKey={appKey} />
			</SideSheet.Content>
		</SideSheet>
	);
}

interface ServiceMessageWidgetProps {
	appKey?: string;
}

const Styles = {
	Wrapper: styled.div`
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
	`,
	NoContentWrapper: styled.div`
		display: flex;
		flex-direction: column;
		min-height: 300px;
		justify-content: center;
	`,
	HeadingWrapper: styled.div`
		display: flex;
		justify-content: space-between;
	`,
};

const portalNameMapper = (identifier: string) => {
	if (identifier === 'Project execution portal') return 'Project Portal';
	return identifier;
};

export const ServiceMessageWidget: FC<ServiceMessageWidgetProps> = ({ appKey }) => {
	const { appsMessages, portalMessages, messages } = useServiceMessage();
	const [compact] = useState(false);

	return (
		<>
			<Styles.Wrapper>
				<Styles.HeadingWrapper>
					<Typography variant="h5">Portal ({portalMessages.length})</Typography>
					<Tooltip content={<ServiceMessageTooltip isSideSheet={true} />}>
						<Icon data={info_circle} color={tokens.colors.interactive.primary__resting.hex} />
					</Tooltip>
				</Styles.HeadingWrapper>
				{portalMessages.length > 0 ? (
					portalMessages.map((portal) => (
						<ServiceMessageList
							key={portal.identifier}
							messages={portal.messages}
							title={portalNameMapper(portal.identifier)}
							currentApp={true}
							compact={compact}
						/>
					))
				) : (
					<Styles.NoContentWrapper>
						<PortalMessage title="No Active Portal Messages" type="Info" isMuted titleVariant="h4">
							Everything appears to be functioning smoothly.
						</PortalMessage>
					</Styles.NoContentWrapper>
				)}
			</Styles.Wrapper>
			<Styles.Wrapper>
				<Styles.HeadingWrapper>
					<Typography variant="h5">
						App Status ({messages.filter((a) => a.scope === 'App').length})
					</Typography>
					<Tooltip content={<ServiceMessageTooltip isSideSheet={true} />}>
						<Icon data={info_circle} color={tokens.colors.interactive.primary__resting.hex} />
					</Tooltip>
				</Styles.HeadingWrapper>
				{appsMessages.length > 0 ? (
					appsMessages
						.sort(sortCurrentAppToTop(appKey))
						.map((appMessageGroup) => (
							<ServiceMessageList
								key={appMessageGroup.key}
								messages={appMessageGroup.messages}
								title={appMessageGroup.name}
								currentApp={!appKey || appMessageGroup.key === appKey}
								compact={compact}
							/>
						))
				) : (
					<Styles.NoContentWrapper>
						<PortalMessage title="No Active App Messages" type="Info" isMuted titleVariant="h4">
							All application appears to be functioning smoothly.
						</PortalMessage>
					</Styles.NoContentWrapper>
				)}
			</Styles.Wrapper>
		</>
	);
};

const sortCurrentAppToTop = (appKey?: string) => {
	return (a: AppServiceMessage, b: AppServiceMessage) => {
		return a.key !== appKey && b.key === appKey ? 1 : -1;
	};
};
