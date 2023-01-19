import { FC, PropsWithChildren, useState, useEffect } from "react";
import styled from "styled-components";
import { useServiceMessage } from "../query/use-service-message";
import { ServiceMessage } from "../types/types";
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

  const { setMessageShown } = useServiceMessage();

  const handleClose = () => {
    setDisplay(false);
    setMessageShown(message.id);
  }

  const onClose = message.type === "Issue" ? handleClose : undefined

  useEffect(() => {
    if (onClose) return;
    const timeoutId = setTimeout(() => handleClose(), timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [])

  if (!display) return null;

  return (
    <StyledMessageWrapper onClick={() => handleClose()} >
      <ServiceMessageCard key={message.id} message={message} onClose={onClose} />
    </StyledMessageWrapper>
  );

}
