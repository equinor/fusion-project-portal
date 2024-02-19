import { Checkbox } from '@equinor/eds-core-react';

import { PortalAction, useTopBarActions } from '@equinor/portal-core';
import styled from 'styled-components';

interface ActionItemProps {
	action: PortalAction;
	isFavorite: boolean;
	showAsMenu?: boolean;
}

const Style = {
	Wrapper: styled.div`
		display: flex;
	`,
};

export function ActionItem({ action, isFavorite }: ActionItemProps) {
	const { toggleActionById } = useTopBarActions();

	if (action.topParOnly || action.hidden) return null;

	if (!action.dropDownOnly && action.icon) {
		return (
			<Style.Wrapper>
				<Checkbox
					checked={isFavorite}
					label={action.name}
					onChange={() => {
						toggleActionById(action.actionId);
					}}
				/>
			</Style.Wrapper>
		);
	}

	return null;
}
