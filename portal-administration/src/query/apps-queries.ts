import { IHttpClient } from "@equinor/fusion-framework-react-app/http";
import { formatError } from "../utils/error-utils";
import { AppManifestResponse, PortalApp } from "../types";

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

export type Result = {
  appKey: string;
  status: "failed" | "success";
};

export const addPortalApp = async (
  client: IHttpClient,
  appKey: string,
  portalId: string
) => {
  const response = await client.fetch<Response>(
    `api/portals/${portalId}/apps`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appKey,
        removeAppForContexts: true,
      }),
    }
  );

  if (!response.ok) {
    return { appKey, status: "failed" } as Result;
  }

  return { appKey, status: "success" } as Result;
};

export const addPortalApps = async (
  client: IHttpClient,
  portalApps: PortalApp[],
  portalId?: string
) => {
  if (!portalId) return [] as Result[];
  const results: Result[] = [];

  for (const app of portalApps) {
    const result = await addPortalApp(client, app.appKey, portalId);
    results.push(result);
  }

  return results as Result[];
};

export const removePortalApp = async (
  client: IHttpClient,
  appKey: string,
  portalId: string
) => {
  const response = await client.fetch<Response>(
    `api/portals/${portalId}/apps/${appKey}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return { appKey, status: "failed" } as Result;
  }

  return { appKey, status: "success" } as Result;
};

export const removePortalApps = async (
  client: IHttpClient,
  portalApps: PortalApp[],
  portalId?: string
) => {
  if (!portalId) return [] as Result[];
  const results: Result[] = [];

  for (const app of portalApps) {
    const result = await removePortalApp(client, app.appKey, portalId);
    results.push(result);
  }

  return results as Result[];
};
