import { AppGroup } from '@equinor/portal-core';
import { AppCard } from '../app-card/AppCard';
import { ColorTab } from './ColorTab';
import { useParams } from 'react-router-dom';
import { styles } from '../styles';

type GroupProps = {
	group: AppGroup;
};

export const Group = ({ group }: GroupProps) => {
	const { appKey } = useParams();
	const isGroupActive = !!group.apps.find((a) => a.appKey === appKey);

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
							key={child.appKey}
							appKey={child.appKey}
							name={child.name}
							isDisabled={child.isDisabled !== undefined ? child.isDisabled : false}
							isActive={appKey === child.appKey}
						/>
					))}
				</ol>
			</nav>
		</div>
	);
};
