import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { usePortalActions } from '@equinor/portal-core';
import { PropsWithChildren, useRef } from 'react';
import styled from 'styled-components';
import { FullscreenIcon } from '../fullscreen-icon/FullscreenIcon';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${tokens.colors.ui.background__default.hex};
`;

const StyledHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const StyledTitleContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
`;

const StyledActionsWrapper = styled.div`
  display: flex;
`;

type HEXString = `#${string}`;

const StyledIndicator = styled.span<{ color?: HEXString }>`
  background-color: ${({ color }) => color || 'red'};
  height: 48px;
  width: 16px;
`;

const ContentWrapper = styled.div``;

export function SideSheetHeader({
  children,
  title,
  subTitle,
  color,
}: PropsWithChildren<{ title: string; subTitle: string; color: HEXString }>) {
  const { closeActiveAction } = usePortalActions();
  const ref = useRef<HTMLDivElement>(null);

  function handleFullscreenClick() {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => console.log('Document Exited from Full screen mode'))
        .catch((err) => console.error(err));
    } else {
      ref.current?.requestFullscreen();
    }
  }

  return (
    <StyledWrapper ref={ref}>
      <StyledHeader>
        <StyledTitleWrapper>
          <StyledIndicator color={color} />
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
