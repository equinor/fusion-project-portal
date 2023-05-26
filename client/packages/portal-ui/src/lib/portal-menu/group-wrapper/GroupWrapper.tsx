import { AppGroup } from '@equinor/portal-core';
import { InfoMessage } from '../../info-message/InfoMessage';
import { Group } from '../group/Group';
import { styles } from '../styles';

type GroupWrapperProps = {
	appGroups: AppGroup[];
};

export const GroupWrapper = ({ appGroups }: GroupWrapperProps) => {
	return (
		<div className={styles.groupWrapper}>
			{appGroups.length ? (
				appGroups.map((appGroup) => <Group key={appGroup.name} group={appGroup} />)
			) : (
				<InfoMessage>No applications found</InfoMessage>
			)}
		</div>
	);
};
