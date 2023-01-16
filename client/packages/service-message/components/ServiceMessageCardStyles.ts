import { Card, Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";

export const StyledCard = styled(Card)`
    display: flex;
    flex-direction: row;
    box-shadow: 0 1px 5px rgb(0 0 0 / 10%), 0 3px 4px rgb(0 0 0 / 5%), 0 2px 4px rgb(0 0 0 / 0%);
    overflow: hidden;
    gap:0;
`;

export const StyledCardIndicator = styled.div<{ color: string }>`
    display: block;
    width: 16px;
    background-color: ${({ color }) => color};
`;

export const StyledContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const StyledHeaderWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    border-bottom: 1px solid ${tokens.colors.ui.background__medium.rgba};
`;

export const StyledHeader = styled(Typography) <{ width: number }>`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: ${({ width }) => `${width}px`};
`;

export const StyledTime = styled(Typography)`
    white-space: nowrap;
`;

export const StyledHeaderItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:1rem;
`;

