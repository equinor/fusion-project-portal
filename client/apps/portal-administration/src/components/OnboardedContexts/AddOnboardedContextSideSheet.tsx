import { Card, TextField, Autocomplete, Typography, Checkbox } from '@equinor/eds-core-react';

import SideSheet from '@equinor/fusion-react-side-sheet';
import styled from 'styled-components';
import { PortalApp } from '../../types';
import { useGetContextTypes } from '../../hooks/use-context-type-query';
import { useEditOnboardedApp } from '../../hooks/use-onboarded-apps';
import { PartialWithDefined } from '../../types/utils';

const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 2rem;
	`,
	PadTop: styled(Typography)`
		padding-bottom: 1rem;
	`,
	Card: styled(Card)<{ col?: number }>`
		box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2), 0px 2px 4px -2px rgba(16, 24, 40, 0.2);
		width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 3rem)`};
	`,
};

export function AddOnboardedContextSideSheet({
	app,
	onClose,
}: {
	app?: PartialWithDefined<PortalApp, 'appKey' | 'name'>;
	onClose: VoidFunction;
}) {
	const { data: contextTypes } = useGetContextTypes();
	const { mutateAsync } = useEditOnboardedApp(app?.appKey);
	if (!app) return null;

	return (
		<SideSheet
			isOpen={Boolean(app)}
			onClose={() => {
				onClose();
			}}
			isDismissable={true}
		>
			<SideSheet.Title title="Portal Application" />
			<SideSheet.SubTitle subTitle="Edit onboarded application information" />
			<SideSheet.Actions></SideSheet.Actions>
			<SideSheet.Content>
				<Style.Wrapper>
					<div>
						<Style.PadTop variant="h4">Context</Style.PadTop>
						<TextField id="app-name" readOnly value={app.name} label="App Name"></TextField>
						<TextField id="app-name" readOnly value={app.appKey} label="AppKey"></TextField>
						<TextField id="app-name" readOnly value={app.id} label="AppId"></TextField>
						<Checkbox id="app-is-legacy" checked={app.isLegacy} label="Is Legacy" />
					</div>
					<div>
						<Style.PadTop variant="h4">Context Type</Style.PadTop>
						<Style.PadTop>This is the context types that the application supports</Style.PadTop>
						<Autocomplete
							id="app-context-types"
							multiple
							options={contextTypes || []}
							optionLabel={(contextTypes) => contextTypes.type}
							initialSelectedOptions={app.contexts}
							itemCompare={(item, compare) => {
								return item.type === compare.type;
							}}
							onOptionsChange={(change) => {
								mutateAsync({
									appKey: app.appKey,
									contextTypes: change.selectedItems.map((c) => c.type),
								});
							}}
							label="Context Types"
						/>
					</div>
				</Style.Wrapper>
			</SideSheet.Content>
		</SideSheet>
	);
}
