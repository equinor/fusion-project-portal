import { createGlobalStyle } from 'styled-components';

export const GlobalColorStyle = createGlobalStyle`
:root {

  // Primary color and alternatives
  --color-primary: #007079;// Moss green
  --color-primary-alt1: #73B0B5;
--color-primary-alt2: #A8CED1;
--color-primary-alt3: #C9E1E3;
--color-primary-alt4: #DEECEE;

// Signal color and alternatives
--color-signal: #FF1243; // Energy red
--color-signal-alt1: #FF7D98;
--color-signal-alt2: #FFAEBF;
--color-signal-alt3: #FFCDD8;
--color-signal-alt4: #FFE0E7;

// Accent 1 color and alternatives
--color-accent1: #990025; // Weathered red
--color-accent1-alt1: #C77387;
--color-accent1-alt2: #DCA8B5;
--color-accent1-alt3: #EAC9D1;
--color-accent1-alt4: #F2DEE3;

// Accent 2 color and alternatives
--color-accent2: #243746; // Slate blue
--color-accent2-alt1: #879199;
--color-accent2-alt2: #B5BBC0;
--color-accent2-alt3: #D1D5D8;
--color-accent2-alt4: #E3E5E7;

// Accent 3 color and alternatives
--color-accent3: #DEFAEB; // Soft mint
--color-accent3-alt1: #EDFCF4;
--color-accent3-alt2: #F4FDF8;
--color-accent3-alt3: #F8FEFB;
--color-accent3-alt4: #FBFEFC;

// Accent 4 color and alternatives
--color-accent4: #D5EAF4; // Mist blue
--color-accent4-alt1: #E8F3F9;
--color-accent4-alt2: #F1F8FB;
--color-accent4-alt3: #F6FBFD;
--color-accent4-alt4: #FAFCFE;

// Accent 5 color and alternatives
--color-accent5: #FBE5D5; // Spruce wood
--color-accent5-alt1: #FDF1E8;
--color-accent5-alt2: #FEF6F1;
--color-accent5-alt3: #FEFAF6;
--color-accent5-alt4: #FFFCFA;

// *** NB! New design system colors ***

// Primary
--primary-moss-green-100: #007079;
--primary-moss-green-55: #73B1B5;
--primary-moss-green-34: #A8CED1;
--primary-moss-green-21: #C9E0E2;
--primary-moss-green-13: #DEEDEE;
--primary-accent-slate-blue: #243746;

// Secondary
--secondary-energy-red-100: #FF1243;
--secondary-energy-red-55: #FF7D98;
--secondary-energy-red-34: #FFAEBF;
--secondary-energy-red-21: #FFCDD7;
--secondary-energy-red-15: #FFE0E7;
--secondary-accent-weathered-red: #990025;

// Black
--black-100: #000000;
--black-80: #333333;
--black-25: #BFBFBF;
--black-10: #E6E6E6;
--black-3: #F7F7F7;
--black-white: #FFFFFF;

// Supplementary
--supplementary-mist-blue: #D5EAF4;
--supplementary-soft-mint: #DEFAEB;
--supplementary-spruce-wood: #FBE5D5;

// Non-brand colors
--non-brand-yellow: #FBCA36;
--non-brand-orange: #FF9200;
--non-brand-red: #FF3B3B;
--non-brand-green: #4BB748;
--non-brand-purple: #771FDD;
--non-brand-blue: #1273DD;
--non-brand-turquoise: #1DB7A6;

}
/* :root {
    primary: --color-primary;
    primaryAlt1: --color-primary-alt1;
    primaryAlt2: --color-primary-alt2;
    primaryAlt3: --color-primary-alt3;
    primaryAlt4: --color-primary-alt4;

    signal: --color-signal;
    signalAlt1: --color-signal-alt1;
    signalAlt2: --color-signal-alt2;
    signalAlt3: --color-signal-alt3;
    signalAlt4: --color-signal-alt4;

    accent1: --color-accent1;
    accent1Alt1: --color-accent1-alt1;
    accent1Alt2: --color-accent1-alt2;
    accent1Alt3: --color-accent1-alt3;
    accent1Alt4: --color-accent1-alt4;

    accent2: --color-accent2;
    accent2Alt1: --color-accent2-alt1;
    accent2Alt2: --color-accent2-alt2;
    accent2Alt3: --color-accent2-alt3;
    accent2Alt4: --color-accent2-alt4;

    accent3: --color-accent3;
    accent3Alt1: --color-accent3-alt1;
    accent3Alt2: --color-accent3-alt2;
    accent3Alt3: --color-accent3-alt3;
    accent3Alt4: --color-accent3-alt4;

    accent4: --color-accent4;
    accent4Alt1: --color-accent4-alt1;
    accent4Alt2: --color-accent4-alt2;
    accent4Alt3: --color-accent4-alt3;
    accent4Alt4: --color-accent4-alt4;

    accent5: --color-accent5;
    accent5Alt1: --color-accent5-alt1;
    accent5Alt2: --color-accent5-alt2;
    accent5Alt3: --color-accent5-alt3;
    accent5Alt4: --color-accent5-alt4;

    primaryMossGreen100: --primary-moss-green-100;
    primaryMossGreen55: --primary-moss-green-55;
    primaryMossGreen34: --primary-moss-green-34;
    primaryMossGreen21: --primary-moss-green-21;
    primaryMossGreen13: --primary-moss-green-13;
    primaryAccentSlateBlue: --primary-accent-slate-blue;

    secondaryEnergyRed100: --secondary-energy-red-100;
    secondaryEnergyRed55: --secondary-energy-red-55;
    secondaryEnergyRed34: --secondary-energy-red-34;
    secondaryEnergyRed21: --secondary-energy-red-21;
    secondaryEnergyRed15: --secondary-energy-red-15;
    secondaryAccentWeatheredRed: --secondary-accent-weathered-red;

    black100: --black-100;
    black80: --black-80;
    black25: --black-25;
    black10: --black-10;
    black3: --black-3;
    blackWhite: --black-white;

    supplementaryMistBlue: --supplementary-mist-blue;
    supplementarySoftMint: --supplementary-soft-mint;
    supplementarySpruceWood: --supplementary-spruce-wood;

    nonBrandYellow: --non-brand-yellow;
    nonBrandOrange: --non-brand-orange;
    nonBrandRed: --non-brand-red;
    nonBrandGreen: --non-brand-green;
    nonBrandPurple: --non-brand-purple;
    nonBrandBlue: --non-brand-blue;
    nonBrandTurquoise: --non-brand-turquoise;
} */

`;
