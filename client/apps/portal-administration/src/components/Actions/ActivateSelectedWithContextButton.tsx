import { Button, Icon } from '@equinor/eds-core-react';
import { PortalApp } from '../../types';

import { add_circle_filled, add_circle_outlined } from '@equinor/eds-icons';

type ActivateSelectedWithContextButtonProps = {
	selection: PortalApp[];
	activateSelectedWithContext: VoidFunction;
};

export const ActivateSelectedWithContextButton = ({
	selection,
	activateSelectedWithContext,
}: ActivateSelectedWithContextButtonProps) => {
	const isActive = selection.some((a) => a.isActive);

	if (isActive) {
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
			<Icon data={add_circle_filled} /> Activate Selected with Context
		</Button>
	);
};
