import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren } from 'react';
import { useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const StylesWrapper = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;


const StylesContentWrapper = styled.div`
 padding-top: 1rem;
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
  color,
  children
}: PropsWithChildren<PortalErrorPageProps>) {
  const error = useRouteError() as Error;


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

      <StylesContentWrapper>
        {children && children}
      </StylesContentWrapper>

     {
      error && <div>
        <h4>
        {error.name}
          </h4>
          <p>
          {error.message}
          </p>
      </div>
     }
    </StylesWrapper>
  );
}
