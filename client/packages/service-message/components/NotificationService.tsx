import { FC, PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useServiceMessage } from "../service-message";
import { MessageWrapper } from "./MessageWrapper";

const StyledMessageListWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
  z-index: 1;

`;

const StyledWrapper = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
`;

export const NotificationService: FC<PropsWithChildren<{}>> = ({ children }) => {
    const { appKey } = useParams();
    const { currentMessages } = useServiceMessage(appKey);
    return <StyledWrapper>
        {children}
        <StyledMessageListWrapper>
            {currentMessages.length > 0 ? currentMessages.map((message) =>
                <MessageWrapper key={message.id} message={message} timeout={message.type === "Maintenance" ? 8000 : 5000} />
            ) : null}
        </StyledMessageListWrapper>

    </StyledWrapper>
}

