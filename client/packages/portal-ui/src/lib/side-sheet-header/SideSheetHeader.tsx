import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { usePortalActions } from '@equinor/portal-core';
import { PropsWithChildren, useRef } from 'react';
import { FullscreenIcon } from '../fullscreen-icon/FullscreenIcon';

import {
  ContentWrapper,
  StyledActionsWrapper,
  StyledHeader,
  StyledIndicator,
  StyledTitleContentWrapper,
  StyledTitleWrapper,
  StyledWrapper,
} from './side-sheet-header-styles';
import { HEXString } from './types';

interface SideSheetHeaderProps {
  title: string; subTitle: string; color?: HEXString
}

export function SideSheetHeader({
  children,
  title,
  subTitle,
  color,
}: PropsWithChildren<SideSheetHeaderProps>) {

  const { closeActiveAction } = usePortalActions();
  const ref = useRef<HTMLDivElement>(null);

  function handleFullscreenClick() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error(err));
    } else {
      ref.current?.requestFullscreen();
    }
  }

  return (
    <StyledWrapper ref={ref}>
      <StyledHeader>
        <StyledTitleWrapper>
          {color && <StyledIndicator color={color} />}
          <StyledTitleContentWrapper>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="meta">{subTitle}</Typography>
          </StyledTitleContentWrapper>
        </StyledTitleWrapper>
        <StyledActionsWrapper>
          <Button variant="ghost_icon" onClick={handleFullscreenClick}>
            <FullscreenIcon />
          </Button>
          <Button variant="ghost_icon" onClick={closeActiveAction}>
            <Icon name="close" />
          </Button>
        </StyledActionsWrapper>
      </StyledHeader>
      <ContentWrapper>{children}</ContentWrapper>
    </StyledWrapper>
  );
}
