import { WorkAssigned } from '@equinor/portal-ui';
import { Favorites } from './components/favorites/Favorites';
import { Styles } from './FacilityPage';
import { FacilityProjectPhases } from './components/phases/Phases';

export const FacilityOverview = () => {
	return (
		<Styles.Row>
			<Styles.Col>
				<FacilityProjectPhases />
				<Favorites />
			</Styles.Col>
			<Styles.Col>
				<WorkAssigned />
			</Styles.Col>
		</Styles.Row>
	);
};
