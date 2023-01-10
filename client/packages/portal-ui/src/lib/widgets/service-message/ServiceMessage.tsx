import { Card, Chip, Icon, Typography } from "@equinor/eds-core-react";

import { theme } from "@equinor/fusion-react-styles";
import { AppReference, useServiceMessage, ServiceMessage } from "@equinor/portal-core";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { tokens } from "@equinor/eds-tokens";

import { SideSheetHeader } from "../../side-sheet-header.tsx/SideSheetHeader";
import MarkdownViewer from "./MarkdownViewer";





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
 padding: 1rem;
 display:flex;
 gap: 1rem;
 flex-direction: column;
`;

const StyledTitleWrapper = styled.div`
 display:flex;
 justify-content: space-between;
`;

const StyledHeader = styled.div<{ type: string }>`
 display:flex;
 justify-content: space-between;
 padding: 0.5rem;
 background-color: ${({ type }) => {
    switch (type) {
      case 'Info':
        return theme.colors.ui.background__info.getVariable('color').toString();
      case 'Issue':
      case 'Maintenance':
        return theme.colors.infographic.primary__energy_red_13.getVariable('color').toString();
      default:
        return ""
    }
  }};
`;

export function ServiceMessageIcon() {
  const [color, setColor] = useState<string>("#007079");
  const messages = useServiceMessage();

  useEffect(() => {
    setColor(messages.length > 0 ? tokens.colors.interactive.warning__resting.rgba : tokens.colors.interactive.primary__resting.rgba);
  }, [messages]);
  return <Icon name='comment_chat' color={color} />;
}

const StyledContent = styled(Card.Content)`

`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  :hover{
    background: var(--eds_interactive_primary__hover_alt,rgba(222,237,238,1));
  }
`;



const StyledCard = styled(Card)`
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 3px 4px rgb(0 0 0 / 12%), 0 2px 4px rgb(0 0 0 / 14%);
  overflow: hidden;
`;


const ServiceMessageWidget: FC<ServiceMessageWidgetProps> = ({ appKey }) => {
  const messages = useServiceMessage();
  const [showApps, setShowApps] = useState(true)


  return (
    <SideSheetHeader
      title="Service Message"
      subTitle="Portal service message center"
      color={'#258800'}
    >

      <StyledButton aria-label="Know issues" onClick={() => {
        setShowApps(s => !s)
      }}>
        <Typography variant="h6">
          Know issues in {messages.length} applications
        </Typography>
        <Icon name={showApps ? "chevron_up" : "chevron_down"} />
      </StyledButton>
      {showApps && <StyledWrapper>
        {messages.length > 0 ? messages.map((message) =>
          <ServiceMessageCard key={message.id} message={message} />
        ) : null}
      </StyledWrapper>}
    </SideSheetHeader >
  );
}

const ServiceMessageCard: FC<{ message: ServiceMessage }> = ({ message }) => {
  return (<StyledCard key={message.id}>
    <StyledHeader type={message.type}>
      <Typography variant="overline"><b>{message.scope}</b> <TimeStamp date={message.timestamp} />
      </Typography>

      <Typography variant="overline">{message.type}</Typography>
    </StyledHeader>
    <StyledContent>
      <StyledTitleWrapper>
        <Typography variant="h6">
          {message.title}
        </Typography>
        <AppChips apps={message.relevantApps || []} />

      </StyledTitleWrapper>
      <Typography variant="body_long">
        <MarkdownViewer markdown={message.content || ""} />
      </Typography>
    </StyledContent>
  </StyledCard>)
}

const TimeStamp: FC<{ date: Date }> = ({ date }) => {
  console.log(date);

  const defaultDateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    year: '2-digit',
    minute: '2-digit'
  }
  return <time dateTime={new Date(Date.parse(date.toString())).toISOString()}>
    <span>{new Date(date.toString()).toLocaleDateString(defaultDateOptions.localeMatcher, defaultDateOptions)}</span>
  </time>
}



const AppChips: FC<{ apps: AppReference[] }> = ({ apps }) => {
  return <div>
    {apps?.map(app => <Chip key={app.key}>{app.name}</Chip>)}
  </div >
}


const StyledMessageListWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 500px;
`;

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

  useEffect(() => {
    setTimeout(() => { setDisplay(false) }, timeout)
  })

  if (!display) return null;

  return (
    <StyledMessageWrapper onClick={() => { setDisplay(false) }} >
      <ServiceMessageCard key={message.id} message={message} />
    </StyledMessageWrapper>
  );

}






export const NotificationService: FC<PropsWithChildren<{}>> = ({ children }) => {

  const serviceMessages = useServiceMessage();
  return <div>
    <StyledMessageListWrapper>
      {serviceMessages.length > 0 ? serviceMessages.map((message) =>
        <MessageWrapper key={message.id} message={message} timeout={10000} />
      ) : null}
    </StyledMessageListWrapper>
    {children}
  </div>
}

