import { Typography } from "@equinor/eds-core-react";
import { Link, useParams } from "react-router-dom";
import { useGetPortal } from "../hooks/use-portal-query";
import { Loading } from "../components/Loading";
import styled from "styled-components";

const Style = {
  Wrapper: styled.div`
    gap: 1rem;
    display: flex;
    padding: 1rem;
    flex-direction: column;
  `,
};
export const RouterConfig = () => {
  const { portalId } = useParams();

  const { data: portal, isLoading: portalIsLoading } = useGetPortal(portalId);

  if (portalIsLoading) return <Loading detail="Loading Portal Route Config" />;

  return (
    <Style.Wrapper>
      <Typography variant="h4">
        {portal ? `${portal.name} - Routes Config` : "Postal - Routes Config"}
      </Typography>
    </Style.Wrapper>
  );
};
