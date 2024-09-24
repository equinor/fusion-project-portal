import { Button, Icon } from '@equinor/eds-core-react';
import { PortalApplication } from '../../types';

import { edit } from '@equinor/eds-icons';

type EditSelectedButtonProps = {
	selection: PortalApplication[];
	editSelection: VoidFunction;
};

export const EditSelectedButton = ({ selection, editSelection }: EditSelectedButtonProps) => {
	const isActive = selection.length === 1 && selection[0].isContextual;

	if (!isActive) {
		return null;
	}

	return (
		<Button
			id="activate-selected"
			variant="outlined"
			onClick={() => {
				editSelection();
			}}
		>
			<Icon data={edit} size={16} /> Edit Context
		</Button>
	);
};
