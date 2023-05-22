import { AppGroup } from '@equinor/portal-core';
import styled from 'styled-components';
import { InfoMessage } from '../../info-message/InfoMessage';
import { Group } from '../group/Group';

const StyledGroupWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1em;
	gap: 2em;
	padding-bottom: 2rem;
	height: 150px;
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
				<InfoMessage>No applications found</InfoMessage>
			)}
		</StyledGroupWrapper>
	);
};
