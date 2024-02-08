import { WorkAssigned } from '@equinor/portal-ui';
import { Contracts } from './components/contracts/Contracts';
import { Favorites } from './components/favorites/Favorites';
import { Phases } from './components/project-director/ProjectDirector';
import { Styles } from './ProjectPage';
import AppSearch from './components/app-search';

export const Overview = () => {
	return (
		<Styles.Row>
			<Styles.Col>
				<WorkAssigned />
			</Styles.Col>
			<Styles.Col>
				<Phases />
				<Favorites />
				<AppSearch />
				<Contracts />
			</Styles.Col>
		</Styles.Row>
	);
};
