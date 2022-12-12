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
 *  - [] When starting application the user need to select a context. 
 *  - [] If context selected the user should be able to remove context.
 *  - [] User should be navigated to context page when accessing the portal if context is selected.
 *  - [] The user should be able to navigat to context selection page. 
 *  - [x] Context selector should show previous visited contexts
 *  - [] A user should be able to add context favorites 
 *  - [] Context selcetor in breadcrumbs
*/

const StyledContextSelector = styled(ContextSelector)`
flex: 1;
`;

interface ContextEvent {
  stopPropagation: () => void;
  type: string;
  currentTarget: {
    controller: {
      _selectedItems: any[];
    };
  };
  nativeEvent: {
    detail: {
      selected: ContextResult;
    };
  };
}

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
  const searchRef = useRef();

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
          navigate(`context/$contextId=${e.nativeEvent.detail.selected[0].id}`);
        }}
        value={contextProvider.currentContext?.id ? contextProvider.currentContext?.title || "" :  ''}
        placeholder="Start to type to search..."
        onChange={(e) => {
          e.stopPropagation();
          console.log(e);
        }}
      />

      { contextProvider.currentContext && (<Button variant='ghost' onClick={()=> {navigate(`context/$contextId=${contextProvider.currentContext?.id}`)}}>
        Go to project
      </Button>)}
    </StyledWrapper>
  );
};


