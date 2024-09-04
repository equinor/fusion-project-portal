import { CircularProgress } from "@equinor/eds-core-react";
import styled from "styled-components";

type LoadingProps = {
  detail: string;
};
export const Loading = ({ detail }: LoadingProps) => (
  <Wrapper>
    <CircularProgress /> <div>{detail}</div>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1.2em;
  flex-direction: column;
`;
