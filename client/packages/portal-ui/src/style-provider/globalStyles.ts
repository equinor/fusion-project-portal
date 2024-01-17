import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

   :root {
		--header-height: 48px;
        --custom-header-height: 0px;
        --custom-side-sheet-height: 100%
        --portal-header-height: 48px;
	} 

    body {
        font-family: Equinor, sans-serif;
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

`;
