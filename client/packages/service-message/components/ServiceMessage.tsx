import { Chip, Icon, Typography } from "@equinor/eds-core-react";

import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { tokens } from "@equinor/eds-tokens";

import { SideSheetHeader } from "./side-sheet-header.tsx/SideSheetHeader";
import { ServiceMessage, useServiceMessage } from "../service-message";
import { ServiceMessageList } from "./SirviceMessageList";
import { ServiceMessageCard } from "./ServiceMessageCard";


export function ServiceMessages() {
  const { appKey } = useParams()
  return (
    <ServiceMessageWidget appKey={appKey} />
  );
}

interface ServiceMessageWidgetProps {
  appKey?: string
}

const StyledWrapper = styled.div`
 padding-left: 1rem;
 padding-bottom: 1rem;
 display:flex;
 flex-direction: column;
`;

const StyledMessageChip = styled(Chip)`
    position: absolute;
    right: 6px;
    bottom: 10px;
    padding: 0;
    line-height: 0;
    width: 16px;
    height: 16px;
    text-align: center;
    justify-content: center;
`;

const getSeverity = (messages: ServiceMessage[]): "default" | "error" => {
  return messages.some(message => message.type === "Issue") ? "error" : "default";
}

export function ServiceMessageIcon() {
  const [color, setColor] = useState<string>("#007079");
  const { messages } = useServiceMessage();

  useEffect(() => {
    setColor(messages && messages.length > 0 ? tokens.colors.interactive.warning__resting.rgba : tokens.colors.interactive.primary__resting.rgba);
  }, [messages]);
  return <Icon name='comment_chat' color={color} />

}
/* <StyledMessageChip  variant={getSeverity(messages)}>{messages.length}</StyledMessageChip> */

const ServiceMessageWidget: FC<ServiceMessageWidgetProps> = ({ appKey }) => {
  const { appsMessages, portalMessages, messages } = useServiceMessage();
  const [compact, setCompact] = useState(false)

  return (
    <SideSheetHeader
      title="System status"
      subTitle="Showing whether the system is working as expected"
    >
      <StyledWrapper>
        <Typography variant="h5">
          Portal ({portalMessages.length})
        </Typography>
        {
          portalMessages.length > 0 ? (portalMessages.map((message) =>
            <ServiceMessageCard key={message.id} message={message} />)) : null
        }
      </StyledWrapper>
      <StyledWrapper>
        <Typography variant="h5">
          App Status ({messages.filter(a => a.scope === "App").length})
        </Typography>

        {appsMessages.length > 0 ? appsMessages.map((appMessageGroup) =>
          <ServiceMessageList key={appMessageGroup.key} messages={appMessageGroup.messages} title={appMessageGroup.name} currentApp={!appKey || appMessageGroup.key === appKey} compact={compact} />) : null}
      </StyledWrapper>
    </SideSheetHeader >
  );
}

