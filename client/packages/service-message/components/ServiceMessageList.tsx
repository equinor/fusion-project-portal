import { Button, Icon, Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { FC, useState } from "react";
import styled from "styled-components";
import { ServiceMessage } from "../types/types";
import { ServiceMessageCard } from "./ServiceMessageCard";


interface ServiceMessageListProps {
    messages: ServiceMessage[];
    title: string | null;
    currentApp: boolean;
    compact?: boolean;
}

const StyledButton = styled(Button)`
  width: 100%;
  padding: 0 ;
  padding-top: 0.5rem ;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  :hover{

    background: none;
  }
`;

const StyledServiceMessageCardWrapper = styled.div<{ color: string }>`
    margin-left: 0.7rem;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-left: 1px solid ${({ color }) => color};
`;



const getStatusColor = (messages: ServiceMessage[]): string => {

    const variant = {
        Issue: tokens.colors.interactive.danger__resting.rgba,
        Maintenance: tokens.colors.interactive.warning__resting.rgba,
        Info: tokens.colors.infographic.primary__moss_green_100.rgba
    }


    const severity = messages.reduce((severity, message) => {
        if (severity === 3) return severity;
        const currentSeverity = message.type === "Issue" ? 3 : message.type === "Maintenance" ? 2 : 1;
        if (currentSeverity > severity) {
            severity = currentSeverity;
        }
        return severity;
    }, 1)
    switch (severity) {
        case 3:
            return variant.Issue;
        case 2:
            return variant.Maintenance;
        default:
            return variant.Info;
    }
}


export const ServiceMessageList: FC<ServiceMessageListProps> = ({ messages, title, currentApp, compact }) => {
    const [showApps, setShowApps] = useState(currentApp)
    const color = getStatusColor(messages)
    return (
        <div>
            <StyledButton aria-label="Know issues" variant={"ghost"} onClick={() => {
                setShowApps(s => !s)
            }}>
                <Icon name={showApps ? "chevron_up" : "chevron_down"} color={color} />
                <Typography variant="h6" >
                    {title}  ({messages.length})
                </Typography>

            </StyledButton>
            {
                showApps && <StyledServiceMessageCardWrapper color={color}>
                    {
                        messages.map(message => <ServiceMessageCard key={message.id} message={message} compact={compact} />)
                    }
                </StyledServiceMessageCardWrapper>
            }
        </div>
    );
} 