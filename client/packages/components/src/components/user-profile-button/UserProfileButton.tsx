import { Button } from '@equinor/eds-core-react';
import { TopBarAvatar } from '@portal/components';

import { usePortalWidgets } from '@portal/core';

export const UserProfileButton = () => {
	const { setActivePortalWidgetById } = usePortalWidgets();
	return (
		<Button
			variant="ghost_icon"
			onClick={(e) => {
				e.preventDefault();
				const widgetId = 'profile';
				setActivePortalWidgetById(widgetId);
			}}
		>
			<TopBarAvatar />
		</Button>
	);
};
