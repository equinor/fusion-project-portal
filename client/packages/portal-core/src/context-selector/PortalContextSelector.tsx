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

interface PortalContextSelectorProps {
  variant?: string
  width: string;
}


export const PortalContextSelector = ({ variant }: PortalContextSelectorProps) => {

  const currentContext = useFrameworkCurrentContext();
  const navigate = useNavigate();


  return (
    <StyledWrapper>
      <ContextSelector />
      {currentContext && (<Button variant='ghost' onClick={() => {
        navigate(getContextPageUrl(currentContext?.id))
      }}>
        Go to project
      </Button>)}
    </StyledWrapper>
  );
};

