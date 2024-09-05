import { Button, Icon } from '@equinor/eds-core-react';
import { AppManifestResponse, FormattedError, PortalApp } from '../../types';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { Result } from '../../query/apps-queries';
import { add_circle_outlined } from '@equinor/eds-icons';

type ActivateSelectedButtonProps = {
	selection: PortalApp[];
	activateSelected: UseMutateAsyncFunction<
		Result[],
		FormattedError,
		PortalApp[],
		{
			prevApps: AppManifestResponse[];
			newApps: AppManifestResponse[];
		}
	>;
};

export const ActivateSelectedButton = ({ selection, activateSelected }: ActivateSelectedButtonProps) => {
	const isActive = selection.some((a) => a.isActive);

	if (isActive) {
		return null;
	}

	return (
		<Button
			id="activate-selected"
			variant="ghost"
			onClick={() => {
				activateSelected(selection.filter((a) => !a.isActive));
			}}
		>
			<Icon data={add_circle_outlined} /> Activate Selected
		</Button>
	);
};
