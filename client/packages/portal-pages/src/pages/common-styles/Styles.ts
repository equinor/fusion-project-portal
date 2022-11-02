import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import background from '../../assets/homePageBackground.svg';

export const StyledMain = styled.main`
  background-color: ${tokens.colors.ui.background__light.rgba};
  height: calc(100vh - 48px);
`;

export const StyledBackgroundSection = styled.section`
  width: 100%;
  height: calc(100vh - 48px);
  background-image: url(${background});

  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  background-color: #dee5e7;
`;
