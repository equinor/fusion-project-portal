import { Typography } from "@equinor/eds-core-react";
import { Link, useParams } from "react-router-dom";
import { useGetPortal } from "../hooks/use-portal-query";
import { Loading } from "../components/Loading";

export const RouterConfig = () => {
  const { portalId } = useParams();

  const { data: portal, isLoading: portalIsLoading } = useGetPortal(portalId);

  if (portalIsLoading) return <Loading detail="Loading Portal Route Config" />;

  return (
    <div>
      <Typography variant="h4">
        {portal ? `${portal.name} - Routes Config` : "Postal - Routes Config"}
      </Typography>
    </div>
  );
};
