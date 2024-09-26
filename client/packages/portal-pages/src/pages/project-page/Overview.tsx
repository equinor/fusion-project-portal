import { WorkAssigned } from '@equinor/portal-ui';
import { Contracts } from './components/contracts/Contracts';
import { Favorites } from '../sheared/components/favorites/Favorites';

import { Styles } from './ProjectPage';
import AppSearch from './components/app-search';
import { useFrameworkFeature } from '@equinor/fusion-framework-react/feature-flag';
import { Phases } from './components/phases/Phases';
import { Milestones } from './components/milestones/Milestones';
import { ContextRelationNavigation } from '../sheared/components/context-relation-navigation/ContextRelationNavigation';

export const Overview = ({ openAllApps }: { openAllApps: () => void }) => {
	const { feature: appSearchFeature } = useFrameworkFeature('app-search');
	const { feature: projectMilestonesFeature } = useFrameworkFeature('project-milestones');

	return (
		<Styles.Row>
			<Styles.Col>
				<ContextRelationNavigation title="Facilities" path="facility" type="Facility" />
				<WorkAssigned />
			</Styles.Col>
			<Styles.Col>
				<Phases />
				<Favorites openAllApps={openAllApps} />
				{projectMilestonesFeature?.enabled && <Milestones />}
				{appSearchFeature?.enabled && <AppSearch />}
				<Contracts />
			</Styles.Col>
		</Styles.Row>
	);
};
