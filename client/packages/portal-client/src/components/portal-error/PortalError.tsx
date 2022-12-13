import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const StylesWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface PortalErrorPageProps {
  title: string;
  icon?: string;
}

export function PortalErrorPage({
  title,
  icon = 'error_outlined',
}: PortalErrorPageProps) {
  return (
    <StylesWrapper>
      <Icon
        size={48}
        color={tokens.colors.text.static_icons__tertiary.hex}
        name={icon}
      />
      <Typography
        color={tokens.colors.text.static_icons__tertiary.hex}
        variant="h6"
      >
        {title}
      </Typography>
    </StylesWrapper>
  );
}
