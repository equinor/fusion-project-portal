import { Button, Icon } from '@equinor/eds-core-react';
import { AppManifestResponse, FormattedError, PortalApp } from '../../types';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { Result } from '../../query/apps-queries';
import { check_circle_outlined, title } from '@equinor/eds-icons';

type MakeSelectionGlobalButtonProps = {
	selection: PortalApp[];
	makeSelectionGlobal: UseMutateAsyncFunction<
		Result[],
		FormattedError,
		PortalApp[],
		{
			prevApps: AppManifestResponse[];
			newApps: AppManifestResponse[];
		}
	>;
};

export const MakeSelectionGlobalButton = ({ selection, makeSelectionGlobal }: MakeSelectionGlobalButtonProps) => {
	const isActive = selection.some((a) => a.isActive);

	if (!isActive) {
		return null;
	}

	return (
		<Button
			id="make-global"
			variant="ghost"
			onClick={() => {
				makeSelectionGlobal(selection.filter((a) => a.isActive));
			}}
		>
			<Icon data={check_circle_outlined} /> Make Global
		</Button>
	);
};
