
import styled from 'styled-components';
import { SideSheetHeader } from '../side-sheet-header/SideSheetHeader';
import { Tasks } from './work-assigned/WorkAssigned';

const StyledContent = styled.div`
 padding: 1.5rem;
`

export function Task() {
  return (
    <SideSheetHeader
      title="Task"
      subTitle="Your application related task"
      color={'#258800'}
    >
      <StyledContent>
        <Tasks/>
      </StyledContent>
    </SideSheetHeader>
  );
}
