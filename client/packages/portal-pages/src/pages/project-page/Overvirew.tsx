import { WorkAssigned } from '@equinor/portal-ui';
import { Contracts } from './components/contracts/Contracts';
import { Favorites } from './components/favorites/Favorites';
import { Phases } from './components/project-director/ProjectDirector';
import { Styles } from './ProjectPage';
import AppSearch from './components/app-search';
import { useFrameworkFeature } from '@equinor/fusion-framework-react/feature-flag';

export const Overview = () => {
	const { feature } = useFrameworkFeature('app-search');
	return (
		<Styles.Row>
			<Styles.Col>
				<WorkAssigned />
			</Styles.Col>
			<Styles.Col>
				<Phases />
				<Favorites />
				{feature?.enabled && <AppSearch />}
				<Contracts />
			</Styles.Col>
		</Styles.Row>
	);
};
