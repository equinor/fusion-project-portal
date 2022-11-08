import { AppGroup } from '@equinor/portal-core';
import { AppCard } from '../AppCard/AppCard';
import { ColorTab } from './ColorTab';
import {
  StyledChildrenWrapper,
  StyledGroup,
  StyledGroupBody,
  StyledMenuGroupName,
} from './group.styles';

type GroupProps = {
  group: AppGroup;
};
export const Group = ({ group }: GroupProps) => {
  return (
    <StyledGroup>
      <ColorTab color={group.accentColor} />
      <StyledGroupBody>
        <StyledMenuGroupName>{group.name}</StyledMenuGroupName>
        <StyledChildrenWrapper>
          {group.apps.map((child) => (
            <AppCard
              key={child.appKey}
              appKey={child.appKey}
              name={child.name}
            />
          ))}
        </StyledChildrenWrapper>
      </StyledGroupBody>
    </StyledGroup>
  );
};
