import { Button } from '@equinor/eds-core-react';
import ContextSelector from '@equinor/fusion-react-context-selector';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  useContextResolver,
  useFrameworkContext,
  useFrameworkCurrentContext,
} from '../hooks';
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

export const PortalContextSelector = () => {
  const resolver = useContextResolver(['ProjectMaster']);
  const contextProvider = useFrameworkContext();
  const currentContext = useFrameworkCurrentContext();

  const navigate = useNavigate();


  return (
    <StyledWrapper>
      <ContextSelector
        id="context-selector"
        resolver={{
          ...resolver,
          closeHandler: (e) => {
            e.stopPropagation();
            contextProvider.currentContext = undefined;
          },
        }}
        onSelect={(e: any) => {
          e.stopPropagation();
          contextProvider.contextClient.setCurrentContext(e.nativeEvent.detail.selected[0].id);
          navigate(getContextPageUrl(e.nativeEvent.detail.selected[0].id));
        }}
        value={currentContext?.id ? currentContext?.title || "" : ''}
        placeholder="Start to type to search..."

      />

      {currentContext && (<Button variant='ghost' onClick={() => {
        navigate(getContextPageUrl(currentContext?.id))
      }}>
        Go to project
      </Button>)}
    </StyledWrapper>
  );
};

