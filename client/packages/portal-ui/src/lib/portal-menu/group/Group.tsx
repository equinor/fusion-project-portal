import { AppGroup } from '@equinor/portal-core';
import { AppCard } from '../app-card/AppCard';
import { ColorTab } from './ColorTab';
import { StyledChildrenWrapper, StyledGroup, StyledGroupBody, StyledMenuGroupName } from './group-styles';
import { useParams } from 'react-router-dom';

type GroupProps = {
	group: AppGroup;
};
export const Group = ({ group }: GroupProps) => {
	const { appKey } = useParams();
	const isGroupActive = !!group.apps.find((a) => a.appKey === appKey);
	return (
		<StyledGroup id={`groupe-${group.name}`}>
			<ColorTab color={group.accentColor} />
			<StyledGroupBody>
				<StyledMenuGroupName id={`groupe-${group.name}-name`} title={group.name}>
					{isGroupActive ? <b>{group.name}</b> : <span>{group.name}</span>}
				</StyledMenuGroupName>
				<StyledChildrenWrapper>
					{group.apps.map((child) => (
						<AppCard
							key={child.appKey}
							appKey={child.appKey}
							name={child.name}
							isActive={appKey === child.appKey}
						/>
					))}
				</StyledChildrenWrapper>
			</StyledGroupBody>
		</StyledGroup>
	);
};
