import { WorkAssigned } from '@equinor/portal-ui';
import { Favorites } from '../sheared/components/favorites/Favorites';
import { Styles } from './FacilityPage';
import { FacilityProjectPhases } from './components/phases/Phases';
import { ContextRelationNavigation } from '../sheared/components/context-relation-navigation/ContextRelationNavigation';

export const FacilityOverview = ({ openAllApps }: { openAllApps: () => void }) => {
	return (
		<Styles.Row>
			<Styles.Col>
				<ContextRelationNavigation title="Projects" path="project" type="ProjectMaster" />
				<WorkAssigned />
			</Styles.Col>
			<Styles.Col>
				<Favorites openAllApps={openAllApps} />
				<FacilityProjectPhases />
			</Styles.Col>
		</Styles.Row>
	);
};
