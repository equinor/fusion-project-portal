import { AppCard } from '../AppCard/AppCard';
import { ColorTab } from './ColorTab';
import {
  StyledChildrenWrapper,
  StyledGroup,
  StyledGroupBody,
  StyledMenuGroupName,
} from './group.styles';

export type MenuGroup = {
  name: string;
  color: string;
  children: string[];
};

type GroupProps = {
  group: MenuGroup;
};
export const Group = ({ group }: GroupProps) => {
  return (
    <StyledGroup>
      <ColorTab color={group.color} />
      <StyledGroupBody>
        <StyledMenuGroupName>{group.name}</StyledMenuGroupName>
        <StyledChildrenWrapper>
          {group.children.map((child) => (
            <AppCard key={child} name={child} />
          ))}
        </StyledChildrenWrapper>
      </StyledGroupBody>
    </StyledGroup>
  );
};
