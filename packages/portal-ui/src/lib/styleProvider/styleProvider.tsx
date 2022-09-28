import { EdsProvider, Icon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import React from 'react';
import { createGlobalStyle } from 'styled-components';

Icon.add(icons);

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: Equinor;
        margin: 0;
    };

    p {
        font-family: Equinor;

    }
    button {
        font-family: Equinor;
    }
    pre {
        font-family: Equinor;

        font-weight: 400;
        line-height: 1.250em;
        text-align: left;
    }

    ::-webkit-scrollbar {
        height: 0.5rem;
        width: 0.5rem;
    }

        /* Track */
        ::-webkit-scrollbar-track {
        background: none;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
        background: ${tokens.colors.interactive.primary__resting.rgba};
        border-radius: 5px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
        background:${tokens.colors.interactive.primary__hover.rgba};
        }
`;

const compact = 'compact';

export function StyleProvider({ children }: React.PropsWithChildren) {
  return (
    <EdsProvider>
      <GlobalStyle />
      {children}
    </EdsProvider>
  );
}
