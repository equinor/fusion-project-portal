import { Button, Icon } from '@equinor/eds-core-react';
import { PortalApp } from '../../types';

import { add_circle_outlined, edit } from '@equinor/eds-icons';

type EditSelectedButtonProps = {
	selection: PortalApp[];
	editSelection: VoidFunction;
};

export const EditSelectedButton = ({ selection, editSelection }: EditSelectedButtonProps) => {
	const isActive = selection.some((a) => !a.isActive);

	if (isActive) {
		return null;
	}

	return (
		<Button
			id="activate-selected"
			variant="ghost"
			onClick={() => {
				editSelection();
			}}
		>
			<Icon data={edit} size={16} /> Edit Selected
		</Button>
	);
};
