import { Chip, Icon } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { ServiceMessage, useServiceMessage } from "../service-message";

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