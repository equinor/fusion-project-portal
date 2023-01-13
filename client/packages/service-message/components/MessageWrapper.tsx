import { FC, PropsWithChildren, useState, useEffect } from "react";
import styled from "styled-components";
import { ServiceMessage } from "../service-message";
import { ServiceMessageCard } from "./ServiceMessageCard";

const StyledMessageWrapper = styled.div`
  animation-duration: 1s;
  animation-name: fade;
  cursor: pointer;


  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

`;

export const MessageWrapper: FC<PropsWithChildren<{ message: ServiceMessage, timeout: number }>> = ({ message, timeout }) => {
  const [display, setDisplay] = useState(true)
  const onClose = message.type === "Issue" ? () => { setDisplay(false) } : undefined

  useEffect(() => {
    if (!onClose) {
      setTimeout(() => { setDisplay(false) }, timeout)
    }
  }, [])

  if (!display) return null;

  return (
    <StyledMessageWrapper onClick={() => { setDisplay(false) }} >
      <ServiceMessageCard key={message.id} message={message} onClose={onClose} />
    </StyledMessageWrapper>
  );

}
