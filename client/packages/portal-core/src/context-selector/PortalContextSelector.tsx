import { Button } from '@equinor/eds-core-react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  useFrameworkCurrentContext,
} from '../hooks';
import { ContextSelector } from './ContextSelector';
import { getContextPageUrl } from './utils';



const StyledWrapper = styled.div`
    display: flex;
    width: 50vw;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: .5rem;

    > fwc-searchable-dropdown-provider {
      flex: 1;
    }
`;

const StyledButton = styled(Button)`
white-space: nowrap;
`;
const StyledActionWrapper = styled.div`
min-width: 120px;
`;

export const PortalContextSelector = () => {
  const currentContext = useFrameworkCurrentContext();
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <ContextSelector navigate={navigate} />
      <StyledActionWrapper>
        {currentContext && (<StyledButton variant='ghost' onClick={() => {
          navigate(getContextPageUrl(currentContext?.id))
        }}>
          Go to project
        </StyledButton>)}
      </StyledActionWrapper>
    </StyledWrapper>
  );
};

