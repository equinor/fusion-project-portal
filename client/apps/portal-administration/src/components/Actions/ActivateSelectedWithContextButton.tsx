import { Button, Icon } from '@equinor/eds-core-react';
import {  PortalApplication } from '../../types';

import { add_circle_filled } from '@equinor/eds-icons';
import { useMemo } from 'react';

type ActivateSelectedWithContextButtonProps = {
	selection: PortalApplication[];
	activateSelectedWithContext: VoidFunction;
};

export const ActivateSelectedWithContextButton = ({
	selection,
	activateSelectedWithContext,
}: ActivateSelectedWithContextButtonProps) => {

  // Only active if one is selected or the selected has contextTypes active
	const isActive =  useMemo(()=> (!!selection.find(app => app.contextTypes.length !== 0) && selection.some((a) => !a.isActive) && selection.length < 2),[selection]);

	if (!isActive) {
		return null;
	}

	return (
		<Button
			id="activate-selected"
			variant="ghost"
			onClick={() => {
				activateSelectedWithContext();
			}}
		>
			<Icon data={add_circle_filled} size={16} /> Activate Selected with Context
		</Button>
	);
};
