import styled from 'styled-components';
import background from '../../assets/homePageBackground.svg';

export const StyledMain = styled.main`
  overflow: auto
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
