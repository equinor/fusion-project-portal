import { AppGroup } from '@equinor/portal-core';
import styled from 'styled-components';
import { InfoMessage } from '../../info-message/InfoMessage';
import { Group } from '../group/Group';

const StyledGroupWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 2em;
`;

type GroupWrapperProps = {
	appGroups: AppGroup[];
};
export const GroupWrapper = ({ appGroups }: GroupWrapperProps) => {
	return (
		<StyledGroupWrapper>
			{appGroups.length ? (
				appGroups.map((appGroup) => <Group key={appGroup.name} group={appGroup} />)
			) : (
				<InfoMessage>No application awaitable </InfoMessage>
			)}
		</StyledGroupWrapper>
	);
};
