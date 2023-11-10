import { PortalActionProps } from '@equinor/portal-core';

import { SideSheet } from '@equinor/fusion-react-side-sheet';
import { Divider, Icon, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { ExternalLink, MessageCard } from '@portal/ui';
import { pressure } from '@equinor/eds-icons';

const Style = {
	Wrapper: styled.div`
		padding: 1rem 0.5rem;
	`,
	Content: styled.div`
		padding-top: 1rem;
	`,
};

export const Help = ({ action, onClose, open }: PortalActionProps) => {
	const subTitle = action.subTitle || '';
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
			<SideSheet.SubTitle subTitle={subTitle} />
			<SideSheet.Content>
				<Style.Wrapper>
					<Typography variant="h5"> Welcome to the Fusion Project Portal!</Typography>
					<Style.Content>
						<Typography>
							The application is designed to provide a comprehensive display of fusion applications,
							tailored to the selected project.
							<br />
						</Typography>
					</Style.Content>
					<Divider />
					<MessageCard
						type="Info"
						title="Here vi have provided som use full links to help you navigate the portal."
					/>
					<Divider />
					<Typography variant="h5">The Portal</Typography>
					<Style.Content>
						<ExternalLink
							title="Go to Project Selection"
							text="Project Selection"
							href="https://equinor.github.io/fusion-project-portal-internal/docs/documentation/howTo/projectSelection"
						/>
						<ExternalLink
							title="Go to App Selection"
							text="App Selection"
							href="https://equinor.github.io/fusion-project-portal-internal/docs/documentation/howTo/appSelection"
						/>
						<ExternalLink
							title="Go to Application favorites"
							text="Application favorites"
							href="https://equinor.github.io/fusion-project-portal-internal/docs/documentation/howTo/pinnignApps"
						/>
						<ExternalLink
							title="Go to Navigation Bar"
							text="Navigation Bar"
							href="https://equinor.github.io/fusion-project-portal-internal/docs/documentation/howTo/topBar"
						/>
					</Style.Content>
					<Divider />

					<Typography variant="h5">Whats new</Typography>
					<Style.Content>
						<ExternalLink
							title="Go to Changelog"
							text="Project Portal Changelog"
							href="https://equinor.github.io/fusion-project-portal-internal/docs/documentation/CHANGELOG"
						/>
					</Style.Content>
				</Style.Wrapper>
			</SideSheet.Content>
		</SideSheet>
	);
};
