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

type PortalMessageType = "Error" | "Info" | "Warning" | "NoContent"

interface PortalErrorPageProps {
  title: string;
  body?: React.FC | string;
  type?: PortalMessageType
  icon?: string;
  color?: string;
}

const getPortalMessageType = (type?: PortalMessageType) => {
  switch (type) {
    case "Error":
      return { color: tokens.colors.interactive.danger__resting.hex, icon: "error_outlined" };
    case "Info":
      return { color: tokens.colors.interactive.primary__resting.hex, icon: "error_outlined" };
    case "Warning":
      return { color: tokens.colors.interactive.warning__resting.hex, icon: "error_outlined" };
    case "NoContent":
      return { color: tokens.colors.text.static_icons__default.hex, icon: "file_description" };
    default:
      return undefined;
  }
}

export function PortalMessagePage({
  title,
  icon = 'error_outlined',
  type,
  color
}: PortalErrorPageProps) {

  const currentType = getPortalMessageType(type)

  return (
    <StylesWrapper>
      <Icon
        size={48}
        color={currentType?.color || color || tokens.colors.text.static_icons__tertiary.hex}
        name={currentType?.icon || icon}
      />
      <Typography
        color={currentType?.color || color || tokens.colors.text.static_icons__tertiary.hex}
        variant="h1"
      >
        {title}
      </Typography>



    </StylesWrapper>
  );
}
