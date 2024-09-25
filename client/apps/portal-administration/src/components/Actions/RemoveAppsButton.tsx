import { Button, Icon } from '@equinor/eds-core-react';
import { FormattedError, PortalApplication } from '../../types';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { Result } from '../../query/apps-queries';
import { remove_outlined } from '@equinor/eds-icons';

type RemoveAppsButtonProps = {
	selection: PortalApplication[];
	removeApps: UseMutateAsyncFunction<
		Result[],
		FormattedError,
		PortalApplication[],
		{
			prevApps: PortalApplication[];
			newApps: PortalApplication[];
		}
	>;
};

export const RemoveAppsButton = ({ selection, removeApps }: RemoveAppsButtonProps) => {
	const isActive = selection.some((a) => !a.isActive);
	const appsToRemove = selection.filter((a) => a.isActive);

	if (isActive) {
		return null;
	}

	return (
		<Button
			id="remove-selected"
			variant="outlined"
			onClick={() => {
				removeApps(appsToRemove);
			}}
		>
			<Icon data={remove_outlined} size={16} /> Remove Selected
		</Button>
	);
};
