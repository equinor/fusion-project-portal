import { Button, Icon } from '@equinor/eds-core-react';
import { FormattedError, PortalApplication } from '../../types';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { Result } from '../../query/apps-queries';
import { check_circle_outlined } from '@equinor/eds-icons';

type MakeSelectionGlobalButtonProps = {
	selection: PortalApplication[];
	makeSelectionGlobal: UseMutateAsyncFunction<
		Result[],
		FormattedError,
		PortalApplication[],
		{
			prevApps: PortalApplication[];
			newApps: PortalApplication[];
		}
	>;
};

export const MakeSelectionGlobalButton = ({ selection, makeSelectionGlobal }: MakeSelectionGlobalButtonProps) => {
	const isActive = selection.some((a) => a.isContextual);

	if (!isActive) {
		return null;
	}

	return (
		<Button
			id="make-global"
			variant="outlined"
			onClick={() => {
				makeSelectionGlobal(selection.filter((a) => a.isActive));
			}}
		>
			<Icon data={check_circle_outlined} size={16} /> Make Global
		</Button>
	);
};
