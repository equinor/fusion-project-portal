import styled from 'styled-components';
import { PortalApp } from '../../types';
import { Autocomplete, Typography } from '@equinor/eds-core-react';

import { useEditOnboardedApps } from '../../hooks/use-onboarded-apps';
import { useGetContextTypes } from '../../hooks/use-context-type-query';
import { useEffect, useState } from 'react';

const Styles = {
	Wrapper: styled.div`
		margin-top: 1rem;
		width: 100%;
		height: 100px;
		background-color: #fff;
		position: relative;
		padding-bottom: 2rem;
	`,
	Content: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		height: min-content;
	`,
	Actions: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
};

export const OnboardedAppsActionBar = ({ selection }: { selection: PortalApp[] }) => {
	const { mutateAsync: editSelected } = useEditOnboardedApps();
	const [selected, setSelected] = useState<string[]>();

	useEffect(() => {
		if (
			selection.length === 1 ||
			selection.every((s) => s.contexts.every((context, i) => context?.type === selection[0]?.contexts[i]?.type))
		) {
			setSelected(selection[0]?.contexts.map((c) => c.type));
		} else {
			setSelected([]);
		}
	}, [selection]);
	const { data: contextTypes } = useGetContextTypes();

	if (selection.length === 0) return null;

	return (
		<Styles.Wrapper>
			<Styles.Content>
				<Styles.Actions>
					<Typography variant="overline">Onboarded Apps Actions</Typography>
					<Autocomplete
						id="app-context-types"
						multiple
						options={contextTypes?.map((c) => c.type) || []}
						optionLabel={(contextTypes) => contextTypes}
						selectedOptions={selected}
						itemCompare={(item, compare) => {
							return item === compare;
						}}
						onOptionsChange={(change) => {
							setSelected(change.selectedItems);
							editSelected(
								selection.map((s) => ({ appKey: s.appKey, contextTypes: change.selectedItems }))
							);
						}}
						label="Context Types"
					/>
				</Styles.Actions>
				<Typography variant="overline">Selected applications ({selection.length})</Typography>
			</Styles.Content>
		</Styles.Wrapper>
	);
};
