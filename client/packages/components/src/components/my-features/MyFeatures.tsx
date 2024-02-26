import { Button, Icon, Tabs, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

import { arrow_back } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { useState } from 'react';
import FeatureTogglerApp from './FeatureTogglerApp';
import FeatureTogglerPortal from './FeatureTogglerPortal';
import { useTelemetry } from '@equinor/portal-core';

export const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem, 1rem;
	`,
	TopWrapper: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem, 0;
		align-items: center;
	`,
	Role: styled.div`
		display: flex;
		flex-direction: row;
		padding: 0.5rem;
		justify-content: space-between;
		border: 1px solid grey;
		border-radius: 4px;
		margin-left: 0.5rem;
	`,
	RoleTop: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	`,
	Indicator: styled.div<{ isActive: boolean; hasError?: boolean }>`
		height: 40px;
		width: 0.5rem;
		background-color: ${({ isActive, hasError }) =>
			hasError
				? tokens.colors.interactive.danger__resting.hex
				: isActive
				? tokens.colors.interactive.primary__resting.hex
				: tokens.colors.interactive.disabled__text.hex};
	`,
	NoContent: styled.div`
		height: 50vh;
	`,
};

export const MyFeatures = ({ onClick }: { onClick: VoidFunction }) => {
	const [tab, setTab] = useState<number>(0);
	const { dispatchEvent } = useTelemetry();

	return (
		<Style.Wrapper>
			<Style.TopWrapper>
				<Button variant="ghost_icon" onClick={onClick} name="Back Button" aria-label="Back" role="button">
					<Icon data={arrow_back} />
				</Button>
				<Typography aria-label="My Roles" variant="h6">
					My Features
				</Typography>
			</Style.TopWrapper>
			<Tabs activeTab={tab} onChange={(index) => setTab(index)}>
				<Tabs.List>
					<Tabs.Tab>Portal features</Tabs.Tab>
					<Tabs.Tab>App features</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panels>
					<Tabs.Panel>
						<FeatureTogglerPortal
							onClick={(feature) => {
								if (feature) {
									dispatchEvent(
										{
											name: 'onPortalFeatureToggle',
										},
										{
											key: feature.key,
											title: feature.title,
										}
									);
								}
							}}
						/>
					</Tabs.Panel>
					<Tabs.Panel>
						<FeatureTogglerApp
							onClick={(feature) => {
								if (feature) {
									dispatchEvent(
										{
											name: 'onAppFeatureToggle',
										},
										{
											key: feature.key,
											title: feature.title,
										}
									);
								}
							}}
						/>
					</Tabs.Panel>
				</Tabs.Panels>
			</Tabs>
		</Style.Wrapper>
	);
};
