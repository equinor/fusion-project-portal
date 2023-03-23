import { Scrim } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const StyledScrim = styled(Scrim)`
  animation: ScrimAnimation ease 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  overflow: hidden !important;
  @keyframes ScrimAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const StyledSidesheetWrapper = styled.section`
  height: 100vh;
  position: fixed;
  top: 0;
  transition: right 10s;
  animation: Animation ease 0.3s;
  right: 0px;

  @keyframes Animation {
    0% {
      right: -500px;
    }
    100% {
      right: 0px;
    }
  }
`;

export const StyledSidesheet = styled.section`
  height: 100%;
  background: #fff; // TODO: token
  width: 100%;
`;

export const StyledTop = styled.div`
  display: flex;
  padding-left: 1rem;
  padding-right: 0.1rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #636363;
`;
