import styled from 'styled-components';
import background from '../../assets/homePageBackground.svg';

export const StyledMain = styled.main``;

export const StyledBackgroundSection = styled.section`
  width: 100%;
  height: calc(100vh - 48px);
  background-image: url(${background});

  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  background-color: #dee5e7;
`;

export const StyledContentSection = styled.section`
  padding: 10rem 5rem 0rem 5rem;
`;

export const StyledPaseSectionWrapper = styled.section`
  display: flex;
  gap: 3rem;
  margin-top: 5rem;
`;
