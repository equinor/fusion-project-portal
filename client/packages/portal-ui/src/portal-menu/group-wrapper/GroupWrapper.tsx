import { AppGroup } from '@portal/types';
import { InfoMessage } from '../../info-message/InfoMessage';
import { Group } from '../group/Group';
import { styles } from '../styles';
import { getColumnCount } from '@portal/utils';

type GroupWrapperProps = {
	appGroups: AppGroup[];
	maxAppsInColumn: number;
};

export const GroupWrapper = ({ appGroups, maxAppsInColumn }: GroupWrapperProps) => {
	return (
		<div className={styles.appsWrapper(getColumnCount(maxAppsInColumn, appGroups))}>
			<div className={styles.groupWrapper}>
				{appGroups.length ? (
					appGroups.map((appGroup) => <Group key={appGroup.name} group={appGroup} />)
				) : (
					<InfoMessage>No applications found</InfoMessage>
				)}
			</div>
		</div>
	);
};
