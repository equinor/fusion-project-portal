import { Button, Icon } from '@equinor/eds-core-react';
import { fullscreen, more_vertical, close } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useWidgetProps } from '../../hooks';
import React from 'react';
import styled from 'styled-components';

Icon.add({
  fullscreen,
  more_vertical,
  close,
});

const SubHeader = () => {
  return (
    <StyledSubHeader>
      <StyledColorTab />
      <div style={{ height: '100%' }}>
        <StyledTitle>Bookmarks</StyledTitle>
        <StyledContextId>Johan Castberg</StyledContextId>
      </div>
    </StyledSubHeader>
  );
};

const StyledSubHeader = styled.div`
  display: flex;
  height: 48px;
  gap: 0.4em;
`;

const StyledColorTab = styled.span`
  height: 100%;
  width: 16px;
  background: grey;
  border-radius: 3px;
`;

const ActionBar = () => {
  const { close } = useWidgetProps();

  return (
    <StyledActionBar>
      <Button>New bookmark</Button>
      <Icon
        style={{ cursor: 'pointer' }}
        color={tokens.colors.interactive.primary__resting.hex}
        name={fullscreen.name}
      />
      <Icon
        style={{ cursor: 'pointer' }}
        color={tokens.colors.interactive.primary__resting.hex}
        name={more_vertical.name}
      />
      <Icon
        style={{ cursor: 'pointer' }}
        color={tokens.colors.interactive.primary__resting.hex}
        name={close.name}
        onClick={() => close()}
      />
    </StyledActionBar>
  );
};

export const Header = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SubHeader />
      <ActionBar />
    </div>
  );
};

const StyledActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
`;

const StyledTitle = styled.h2`
  //styleName: Heading/H4;
  font-family: Equinor;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0px;
  margin: 0;
  text-align: left;
`;

const StyledContextId = styled.p`
  //styleName: Paragraph/Meta;
  font-family: Equinor;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
`;
