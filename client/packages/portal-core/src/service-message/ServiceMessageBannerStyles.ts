import { Banner as EDSBanner } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
interface BannerProps {
    iconColor: string;
    background: string;
}

export const Banner = styled(EDSBanner)`
    top: 48px;
    position: fixed;
    width: 100%;
    z-index: 1;
    display: flex;
    background: none;
    justify-content: center;
    align-items: flex-start;
    > div {
      
        width: 50%;
        padding: .5rem 1rem;
        background: ${({ background }: BannerProps) => background};
        
        > span {
            background: ${({ iconColor }: BannerProps) => iconColor};
            color: ${tokens.colors.text.static_icons__primary_white.rgba};
        }
        
    }

    > hr {
        background: transparent;
    }
`;

export const StyledMessageType = styled.div`
 width: fit-content;
 grid-column-start: 0;
`;