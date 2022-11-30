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
  groups: AppGroup[];
};
export const GroupWrapper = ({ groups }: GroupWrapperProps) => {
  return (
    <StyledGroupWrapper>
      {groups.length ? (
        groups.map((group) => <Group key={group.name} group={group} />)
      ) : (
        <InfoMessage>No application awaitable for this view</InfoMessage>
      )}
    </StyledGroupWrapper>
  );
};
