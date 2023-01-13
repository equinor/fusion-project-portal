import { Button, Icon } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { FC, useState } from "react";
import { ServiceMessage } from "../types/types"
import { AppChips } from "./AppChips";
import MarkdownViewer from "./MarkdownViewer";
import { StyledCard, StyledCardIndicator, StyledContentWrapper, StyledHeader, StyledHeaderItem, StyledHeaderWrapper, StyledTime } from "./ServiceMessageCardStyles";
import { TimeStamp } from "./TimeStamp";


const getIconVariant = (type: "Issue" | "Maintenance" | "Info") => {
    const variant = {
        Issue: { name: "warning_filled", color: tokens.colors.interactive.danger__resting.rgba },
        Maintenance: { name: "error_filled", color: tokens.colors.interactive.warning__resting.rgba },
        Info: { name: "error_filled", color: tokens.colors.infographic.primary__moss_green_100.rgba }
    }
    return variant[type]
}

const getIconName = (active: boolean) => active ? "chevron_up" : "chevron_down"


export const ServiceMessageCard: FC<{ message: ServiceMessage, onClose?: VoidFunction, compact?: boolean }> = ({ message, onClose, compact = true }) => {
    const variant = getIconVariant(message.type);
    const [showContent, setShowContent] = useState(compact || message.type === "Issue");

    return (<StyledCard key={message.id}>
        <StyledCardIndicator color={variant.color} />
        <StyledContentWrapper>
            <StyledHeaderWrapper >
                <StyledHeaderItem>
                    <Icon {...variant} />
                    <StyledHeader token={tokens.typography.ui.accordion_header}>{message.title}
                    </StyledHeader>
                </StyledHeaderItem>
                <StyledHeaderItem>
                    <StyledTime variant="overline" >
                        <TimeStamp date={message.timestamp} />
                    </StyledTime>
                    {onClose ? <Button variant="ghost_icon" onClick={() => onClose()} >
                        <Icon name="close" />
                    </Button> : <Button variant="ghost_icon" onClick={() => {
                        setShowContent(state => !state)
                    }} >
                        <Icon name={getIconName(showContent)} />
                    </Button>}
                </StyledHeaderItem>

            </StyledHeaderWrapper>

            {showContent &&
                <div>
                    <MarkdownViewer markdown={message.content || ""} />
                </div>
            }

        </StyledContentWrapper>
    </StyledCard>)
}