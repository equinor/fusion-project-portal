import { Card, Typography } from '@equinor/eds-core-react';

import SideSheet from '@equinor/fusion-react-side-sheet';
import styled from 'styled-components';
import { Portal } from '../../types';
import { useGetContextTypes } from '../../hooks/use-context-type-query';
import { EditPortalForm } from '../Portal/EditPortalForm';
import { FormActionBar } from '../Portal/FormActionBar';
import { useState } from 'react';
import { useGetPortal } from '../../hooks/use-portal-query';

const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 2rem;
	`,
	PadTop: styled(Typography)`
		padding-bottom: 1rem;
	`,
	PadBottom: styled.div`
		padding-bottom: 0.5rem;
	`,
	Card: styled(Card)<{ col?: number }>`
		box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2), 0px 2px 4px -2px rgba(16, 24, 40, 0.2);
		width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 3rem)`};
	`,
};

export function PortalSideSheet({ portal, onClose }: { portal?: Portal; onClose: VoidFunction }) {
	const { data: contextTypes } = useGetContextTypes();
	const { data: fullPortal } = useGetPortal(portal?.id);
	const [isDisabled, setOnDisabled] = useState<boolean>(false);

	if (!portal || !contextTypes) return null;

	return (
		<SideSheet
			isOpen={Boolean(portal)}
			minWidth={700}
			onClose={() => {
				onClose();
			}}
			isDismissable={true}
		>
			<SideSheet.Title title={portal.name} />
			<SideSheet.SubTitle subTitle="Portal Quick Edit" />
			<SideSheet.Actions>
				<Style.PadBottom>
					<FormActionBar isDisabled={isDisabled} portal={portal} isIcons onClose={onClose} />
				</Style.PadBottom>
			</SideSheet.Actions>
			<SideSheet.Content>
				<Style.Wrapper>
					<EditPortalForm
						onDisabled={(disabled) => {
							setOnDisabled(disabled);
						}}
						isSideSheet
						portal={{ ...portal, ...fullPortal }}
						contextTypes={contextTypes}
					/>
				</Style.Wrapper>
			</SideSheet.Content>
		</SideSheet>
	);
}
