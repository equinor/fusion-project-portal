import { useCurrentUser } from '@portal/core';
import { getAccountTypeColor } from '@portal/ui';

import { SideSheet } from '@equinor/fusion-react-side-sheet';

import { ProfileCardHeader } from './components/ProfileCardHeader';

import { ProfileContactDetails } from './components/ProfileContactDetails';
import { Icon } from '@equinor/eds-core-react';
import { ProfileManagerCard } from './components/ProfileManager';
import { briefcase, settings, verified_user } from '@equinor/eds-icons';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useState } from 'react';
import { MyRolesTab } from '../my-roles-tab/MyRolesTab';
import { MyAllocationTab } from '../my-allocations-tab/MyAllocationTab';
import { PortalSettingsTab } from '../portal-settings-tab/PortalSettingsTab';
import { PortalActionProps } from '@equinor/portal-core';
import { PresenceIndicator } from '../presence-indicator';

const Style = {
	Wrapper: styled.div`
		padding: 1rem 0rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	`,
	Button: styled.button`
		width: 100%;
		display: flex;
		padding: 1rem;
		height: auto;
		gap: 1rem;
		align-items: center;
		background: none;
		border: 1px solid transparent;
		color: ${tokens.colors.interactive.primary__resting.hex};
		font-weight: 500;
		line-height: 1.143em;
		text-align: center;
		:hover {
			background: var(--eds_interactive_primary__hover_alt, rgba(222, 237, 238, 1));
			color: var(--eds_interactive_primary__hover, rgba(0, 79, 85, 1));
			border: 1px solid transparent;
			border-radius: var(--eds_button__radius, 4px);
		}
		:focus-visible {
			outline: 2px dashed rgba(0, 112, 121, 1);
			outline-offset: 3px;
		}
	`,
};

type Tabs = {
	Profile: JSX.Element;
	MyRoles: JSX.Element;
	MyAllocations: JSX.Element;
	PortalSettings: JSX.Element;
};

export function MyAccount({ action, onClose, open }: PortalActionProps) {
	const { data: user, isLoading } = useCurrentUser();

	const [activeTab, setActiveTab] = useState<keyof Tabs>('Profile');

	const tabs: Tabs = useMemo(() => {
		return {
			Profile: (
				<>
					<PresenceIndicator />
					<hr />
					<ProfileContactDetails user={user} isLoading={isLoading} />
					<hr />
					<ProfileManagerCard user={user} />
					<hr />
					<Style.Wrapper>
						<Style.Button onClick={() => setActiveTab('MyAllocations')}>
							<Icon data={briefcase} scale={40} color={tokens.colors.text.static_icons__tertiary.hex} />
							My Allocations
						</Style.Button>
						<Style.Button onClick={() => setActiveTab('MyRoles')}>
							<Icon
								data={verified_user}
								scale={40}
								color={tokens.colors.text.static_icons__tertiary.hex}
							/>
							My Roles
						</Style.Button>
					</Style.Wrapper>
					<hr />
					<Style.Wrapper>
						<Style.Button onClick={() => setActiveTab('PortalSettings')}>
							<Icon data={settings} scale={40} color={tokens.colors.text.static_icons__tertiary.hex} />
							Portal Setting
						</Style.Button>
					</Style.Wrapper>
				</>
			),
			MyRoles: <MyRolesTab onClick={() => setActiveTab('Profile')} userRoles={user?.roles} />,
			MyAllocations: <MyAllocationTab onClick={() => setActiveTab('Profile')} positions={user?.positions} />,
			PortalSettings: <PortalSettingsTab onClick={() => setActiveTab('Profile')} user={user} />,
		};
	}, [user, setActiveTab]);

	return (
		<SideSheet isOpen={open} onClose={onClose} isDismissable={true} minWidth={action.minWidth}>
			<SideSheet.Indicator color={getAccountTypeColor(user?.accountType)} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={user?.accountType || ''} />
			<SideSheet.Content>
				{/* <InfoMessage>This functionality is not yet implemented.</InfoMessage> */}
				<ProfileCardHeader user={user} />
				<hr />
				{tabs[activeTab]}
			</SideSheet.Content>
		</SideSheet>
	);
}
