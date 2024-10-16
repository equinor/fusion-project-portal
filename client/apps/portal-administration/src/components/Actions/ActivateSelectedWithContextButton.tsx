import { Button, Icon } from '@equinor/eds-core-react';
import { PortalApp, PortalApplication } from '../../types';

import { add_circle_filled } from '@equinor/eds-icons';

type ActivateSelectedWithContextButtonProps = {
	selection: PortalApplication[];
	activateSelectedWithContext: VoidFunction;
};

export const ActivateSelectedWithContextButton = ({
	selection,
	activateSelectedWithContext,
}: ActivateSelectedWithContextButtonProps) => {
	const isActive = selection.some((a) => !a.isActive) && selection.length < 2;

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
