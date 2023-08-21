import { AppGroup } from '@equinor/portal-core';
import { InfoMessage } from '../../info-message/InfoMessage';
import { Group } from '../group/Group';
import { styles } from '../styles';

type GroupWrapperProps = {
	appGroups: AppGroup[];
	columnStyle?: string;
};

export const GroupWrapper = ({ appGroups, columnStyle }: GroupWrapperProps) => {
	return (
		<div className={styles.groupWrapper(columnStyle ?? 'column')}>
			{appGroups.length ? (
				appGroups.map((appGroup) => <Group key={appGroup.name} group={appGroup} />)
			) : (
				<InfoMessage>No applications found</InfoMessage>
			)}
		</div>
	);
};
