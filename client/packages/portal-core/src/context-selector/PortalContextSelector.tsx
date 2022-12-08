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

const StyledContextSelector = styled(ContextSelector)``;

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

const StyledNavigationButton = styled(Button)`
  margin-bottom: 1rem;
`;

export const PortalContextSelector = () => {
  const resolver = useContextResolver(['Facility', 'ProjectMaster']);
  const { contextClient } = useFrameworkContext();
  const currentContext = useFrameworkCurrentContext();
  const navigate = useNavigate();
  const searchRef = useRef();

  return (
    <div>
      <StyledContextSelector
        id="context-selector"
        resolver={{
          ...resolver,
          closeHandler: (e) => {
            e.stopPropagation();
            console.log('close', e);
            contextClient.setCurrentContext(undefined);
          },
        }}
        onSelect={(e: any) => {
          e.stopPropagation();
          contextClient.setCurrentContext(e.nativeEvent.detail.selected[0].id);
          navigate(`./${e.nativeEvent.detail.selected[0].id}`);
        }}
        value={contextClient.currentContext?.title || ''}
        placeholder="Start to type to search..."
        onChange={(e) => {
          e.stopPropagation();
          console.log(e);
        }}
      />
    </div>
  );
};
