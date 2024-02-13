import { WorkAssigned } from '@equinor/portal-ui';
import { Contracts } from './components/contracts/Contracts';
import { Favorites } from './components/favorites/Favorites';

import { Styles } from './ProjectPage';
import AppSearch from './components/app-search';
import { useFrameworkFeature } from '@equinor/fusion-framework-react/feature-flag';
import { Phases } from './components/phases/Phases';
import { Milestones } from './components/milestones/Milestones';

export const Overview = () => {
	const { feature } = useFrameworkFeature('app-search');

	const { feature: ccTabFeature } = useFrameworkFeature('cc-tab');
	return (
		<Styles.Row>
			<Styles.Col>
				<WorkAssigned />
			</Styles.Col>
			<Styles.Col>
				<Phases />
				<Favorites />
				{/* Todo remove when cc tab is not in feature flag mode */}
				{ccTabFeature?.enabled === false && <Milestones />}
				{feature?.enabled && <AppSearch />}
				<Contracts />
			</Styles.Col>
		</Styles.Row>
	);
};
