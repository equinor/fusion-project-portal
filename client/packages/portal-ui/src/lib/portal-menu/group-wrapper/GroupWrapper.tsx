import { AppGroup } from '@equinor/portal-core';
import styled from 'styled-components';
import { InfoMessage } from '../../info-message/InfoMessage';
import { Group } from '../group/Group';

type GroupWrapperProps = {
	appGroups: AppGroup[];
};

const StyledGroupWrapper = styled.div<GroupWrapperProps>`
	display: flex;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	gap: 1em;
	width: inherit;
	break-inside: avoid;
	margin-bottom: 1rem;
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
