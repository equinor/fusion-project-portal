import { AppGroup } from '@equinor/portal-core';
import { AppCard } from '../app-card/AppCard';
import { ColorTab } from './ColorTab';
import {
  StyledChildrenWrapper,
  StyledGroup,
  StyledGroupBody,
  StyledMenuGroupName,
} from './group-styles';

type GroupProps = {
  group: AppGroup;
};
export const Group = ({ group }: GroupProps) => {
  return (
    <StyledGroup id={`groupe-${group.name}`}>
      <ColorTab color={group.accentColor} />
      <StyledGroupBody>
        <StyledMenuGroupName
          id={`groupe-${group.name}-name`}
          title={group.name}
        >
          {group.name}
        </StyledMenuGroupName>
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
