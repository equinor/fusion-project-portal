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

export const PortalContextSelector = () => {
  const resolver = useContextResolver(['Facility', 'ProjectMaster']);
  const { contextClient } = useFrameworkContext();
  const currentContext = useFrameworkCurrentContext();
  const navigate = useNavigate();
  const searchRef = useRef();

  return (
    <div>
      <StyledContextSelector
        resolver={resolver}
        ref={searchRef}
        // label="Context Selector"
        initialText="Type to search..."
        onSelect={(e: ContextEvent) => {
          e.stopPropagation();
          contextClient.setCurrentContext(e.nativeEvent.detail.selected[0].id);
          navigate(`./${e.nativeEvent.detail.selected[0].id}`);
        }}
      />
      <div>
        <label>current context:</label>
        <p>
          <b>{currentContext?.title}</b>
        </p>
      </div>
    </div>
  );
};
