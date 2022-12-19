import { Button, Icon, Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { FC, useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const StyledStackWrapper = styled.section`
  position: absolute;
  margin-top: 450px;
  z-index: 0;
`;


interface ErrorViewProps {
  error: Error;
}


export const ErrorViewer: FC<ErrorViewProps> = ({ error }) => {
  const [showStack, setShowStack] = useState(false)
  const cause = error.cause as Error;
  return (

    <StyledWrapper>
      <Icon size={48} name="error_outlined" color={tokens.colors.interactive.warning__resting.rgba} />
      <Typography variant="h3" color={tokens.colors.interactive.warning__resting.rgba}>
        {error.name} - {error.message}
      </Typography>
      {cause && <Typography>
        {cause.message}
      </Typography>}
      <Button variant="ghost" onClick={() => {
        setShowStack(s => !s)
      }}>Toggle Stacktrace</Button>

      {showStack && <StyledStackWrapper >
        {error.stack && <pre>{error.stack}</pre>}
      </StyledStackWrapper>}

    </StyledWrapper>

  );
};
