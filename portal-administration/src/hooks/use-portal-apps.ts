import { useQuery } from "@tanstack/react-query";
import { AppManifestResponse, FormattedError } from "../types";

import { useHttpClient } from "@equinor/fusion-framework-react-app/http";
import { getPortalAppsById } from "../query/apps-queries";

export const useGetPortalApps = (portalId?: string) => {
  const client = useHttpClient("portal-client");

  return useQuery<AppManifestResponse[], FormattedError>({
    queryKey: ["portal-apps", portalId],
    queryFn: ({ signal }) => getPortalAppsById(client, portalId, signal),
    enabled: Boolean(portalId),
  });
};
