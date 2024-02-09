import { FusionAppGroup } from '@portal/types';
import { AppCard } from '../app-card/AppCard';
import { ColorTab } from './ColorTab';
import { useParams } from 'react-router-dom';
import { styles } from '../styles';

type GroupProps = {
	group: FusionAppGroup;
};

export const Group = ({ group }: GroupProps) => {
	const { appKey } = useParams();
	const isGroupActive = !!group.apps.find((a) => a.key === appKey);

	return (
		<div id={`groupe-${group.name}`} className={styles.group}>
			<ColorTab color={group.accentColor} />
			<nav className={styles.groupBody}>
				<h5
					id={`groupe-${group.name}-name`}
					title={group.name}
					className={(styles.menuItem, styles.groupName(isGroupActive))}
				>
					{group.name}
				</h5>
				<ol className={styles.list}>
					{group.apps.map((child) => (
						<AppCard
							key={child.key}
							appKey={child.key}
							name={child.name}
							isDisabled={child.isDisabled !== undefined ? child.isDisabled : false}
							isActive={appKey === child.key}
						/>
					))}
				</ol>
			</nav>
		</div>
	);
};
