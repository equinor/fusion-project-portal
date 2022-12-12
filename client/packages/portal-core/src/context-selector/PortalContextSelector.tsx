import { Button } from '@equinor/eds-core-react';
import ContextSelector, {
  ContextResult,
} from '@equinor/fusion-react-context-selector';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  useContextResolver,
  useFrameworkContext,
  useFrameworkCurrentContext,
} from '../hooks';

/**
 * Context user flow
 *  - [x] When starting application the user need to select a context. 
 *  - [x] If context selected the user should be able to remove context.
 *  - [x] User should be navigated to context page when accessing the portal if context is selected.
 *  - [x] The user should be able to navigat to context selection page. 
 *  - [x] Context selector should show previous visited contexts
 *  - [] A user should be able to add context favorites 
 *  - [] Context selcetor in breadcrumbs
*/

const StyledContextSelector = styled(ContextSelector)`
    flex: 1;
`;

const StyledWrapper = styled.div`
    display: flex;
    width: 50vw;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const PortalContextSelector = () => {
  const resolver = useContextResolver(['ProjectMaster']);
  const contextProvider = useFrameworkContext();
  const currentContext = useFrameworkCurrentContext();
  
  const navigate = useNavigate();


  return (
    <StyledWrapper>
      <StyledContextSelector
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
          navigate(`context-page/$contextId=${e.nativeEvent.detail.selected[0].id}`);
        }}
        value={currentContext?.id ? currentContext?.title || "" :  ''}
        placeholder="Start to type to search..."
        onChange={(e) => {
          e.stopPropagation();
          console.log(e);
        }}
      />

      { currentContext && (<Button variant='ghost' onClick={()=> {
        navigate(`context-page/$contextId=${currentContext?.id}`)
      }}>
        Go to project
      </Button>)}
    </StyledWrapper>
  );
};


