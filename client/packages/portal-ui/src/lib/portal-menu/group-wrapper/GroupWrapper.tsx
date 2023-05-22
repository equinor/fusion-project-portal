import { AppGroup } from '@equinor/portal-core';
import styled from 'styled-components';
import { InfoMessage } from '../../info-message/InfoMessage';
import { Group } from '../group/Group';

type GroupWrapperProps = {
	appGroups: AppGroup[];
};

function getColumns(appGroups: AppGroup[]): number {
	if (!appGroups || appGroups.length === 0) {
		return 1;
	} else if (appGroups.length > 1) {
		return 2;
	} else {
		return 1;
	}
}

const StyledGroupWrapper = styled.div<GroupWrapperProps>`
	display: grid;
	grid-template-columns: repeat(${(props) => getColumns(props.appGroups)}, 1fr);
	grid-gap: 1em;
	gap: 2em;
	padding-bottom: 2rem;
	height: 100%;
`;

export const GroupWrapper = ({ appGroups }: GroupWrapperProps) => {
	return (
		<StyledGroupWrapper appGroups={appGroups}>
			{appGroups.length ? (
				appGroups.map((appGroup) => <Group key={appGroup.name} group={appGroup} />)
			) : (
				<InfoMessage>No applications found</InfoMessage>
			)}
		</StyledGroupWrapper>
	);
};
