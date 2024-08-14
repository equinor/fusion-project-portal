import { IHttpClient } from "@equinor/fusion-framework-react-app/http";
import { formatError } from "../utils/error-utils";
import { AppManifestResponse } from "../types";

export const getPortalAppsById = async (
  client: IHttpClient,
  portalId?: string,
  signal?: AbortSignal
) => {
  const response = await client.fetch<Response>(
    `api/portals/${portalId}/apps`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    }
  );

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.json();
  return data as AppManifestResponse[];
};
