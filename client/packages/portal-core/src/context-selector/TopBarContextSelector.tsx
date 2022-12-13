import styled from "styled-components";
import { ContextSelector } from "./ContextSelector"

const StyledWrapper = styled.span`

    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: .5rem;

    > fwc-searchable-dropdown-provider {
      flex: 1;
    }

    > .mdc-text-field--outlined {
        display: flex;
        align-items: center;
    }
`;

export const TopBarContextSelector = () => {
    return (
        <StyledWrapper>
            <ContextSelector
                variant={"header"}
            />
        </StyledWrapper>
    );
};

