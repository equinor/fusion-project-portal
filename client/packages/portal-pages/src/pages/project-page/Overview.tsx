import { WorkAssigned } from '@equinor/portal-ui';
import { Contracts } from './components/contracts/Contracts';
import { Favorites } from '../sheared/components/favorites/Favorites';

import { Styles } from './ProjectPage';
import AppSearch from './components/app-search';
import { useFrameworkFeature } from '@equinor/fusion-framework-react/feature-flag';
import { Phases } from './components/phases/Phases';
import { Milestones } from './components/milestones/Milestones';
import { Facilities } from './components/facilities/Facilities';

export const Overview = ({ openAllApps }: { openAllApps: () => void }) => {
	const { feature } = useFrameworkFeature('app-search');

	const { feature: ccTabFeature } = useFrameworkFeature('cc-tab');
	return (
		<Styles.Row>
			<Styles.Col>
				<WorkAssigned />
			</Styles.Col>
			<Styles.Col>
				<Phases />
				<Facilities />
				<Favorites openAllApps={openAllApps} />
				{/* Todo remove when cc tab is not in feature flag mode */}
				{ccTabFeature?.enabled === false && <Milestones />}
				{feature?.enabled && <AppSearch />}
				<Contracts />
			</Styles.Col>
		</Styles.Row>
	);
};
