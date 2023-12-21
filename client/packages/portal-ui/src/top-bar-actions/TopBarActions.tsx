import { UserProfileButton } from '@portal/components';
import { TopBarActionList } from './TopBarActionList';
import { TopBarActionMenuDropdown } from './TopBarActionMenuDropdown';

export function TopBarActions() {
	return (
		<>
			<TopBarActionList />
			<TopBarActionMenuDropdown />
			<UserProfileButton />
		</>
	);
}
