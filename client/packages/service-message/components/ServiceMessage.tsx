import { Typography } from "@equinor/eds-core-react";

import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { SideSheetHeader } from "./side-sheet-header.tsx/SideSheetHeader";

import { ServiceMessageList } from "./ServiceMessageList";
import { ServiceMessageCard } from "./ServiceMessageCard";
import { AppServiceMessage } from "../provider/ServiceMessageProvider";
import { useServiceMessage } from "../query/use-service-message";


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


export const ServiceMessageWidget: FC<ServiceMessageWidgetProps> = ({ appKey }) => {
  const { appsMessages, portalMessages, messages, compact } = useServiceMessage();


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

        {appsMessages.sort(sortCurrentAppToTop(appKey)).map((appMessageGroup) =>
          <ServiceMessageList key={appMessageGroup.key} messages={appMessageGroup.messages} title={appMessageGroup.name} currentApp={!appKey || appMessageGroup.key === appKey} compact={compact} />)}
      </StyledWrapper>
    </SideSheetHeader >
  );
}

const sortCurrentAppToTop = (appKey: string = "") => {
  return (a: AppServiceMessage, b: AppServiceMessage) => {
    return a.key !== appKey && b.key === appKey ? 1 : -1
  }
}
