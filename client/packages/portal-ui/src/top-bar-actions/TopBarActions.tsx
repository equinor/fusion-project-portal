import { AppSearchBar } from '@portal/components';
import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { TopBarActionList } from './TopBarActionList';
import { TopBarActionMenuDropdown } from './TopBarActionMenuDropdown';
import { useFrameworkFeature } from '@equinor/fusion-framework-react/feature-flag';

export function TopBarActions() {
	const context = useFrameworkCurrentContext();
	const { feature } = useFrameworkFeature('top-bar-app-search');
	return (
		<>
			{context && feature?.enabled && <AppSearchBar />}
			<TopBarActionList />
			<TopBarActionMenuDropdown />
		</>
	);
}
