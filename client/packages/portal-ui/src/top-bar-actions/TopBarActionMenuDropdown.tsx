import { usePortalActions } from '@equinor/portal-core';

import { TopBarAvatar } from '@portal/components';
import { StyledTopBarButton } from './TopBarActionStyles';

export function TopBarActionMenuDropdown(): JSX.Element {
	const { setActiveActionById } = usePortalActions();

	const handleOnClick = () => {
		setActiveActionById('my-account');
	};

	return (
		<>
			<StyledTopBarButton onClick={handleOnClick} variant="ghost_icon">
				<TopBarAvatar />
			</StyledTopBarButton>
		</>
	);
}
