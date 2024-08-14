import { useParams } from "react-router-dom";
import { EditPortalForm } from "../components/EditPortalForm";
import { useGetPortal } from "../hooks/use-portal-query";
import { useGetContextTypes } from "../hooks/use-context-type-query";

export const EditPortal = () => {
  const { portalId } = useParams();
  const {
    data: portal,
    isLoading: portalLoading,
    error,
  } = useGetPortal(portalId);
  const { data: contextTypes, isLoading: contextTypeLoading } =
    useGetContextTypes();

  if (portalLoading || contextTypeLoading) {
    return <div>Loading...</div>;
  }

  if (!portalId || error || !portal || !contextTypes) {
    return <>No portalId provided</>;
  }

  return <EditPortalForm portal={portal} contextTypes={contextTypes} />;
};
