import { IHttpClient } from "@equinor/fusion-framework-module-http";
import { formatError } from "../utils/error-utils";
import { Portal } from "../types";

export const getPortalsQuery = async (
  client: IHttpClient,
  signal?: AbortSignal
) => {
  const response = await client.fetch(`api/portals`, {
    method: "GET",
    signal,
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.json();
  return data as Portal[];
};

export const createPortalQuery = async (client: IHttpClient, body: Portal) => {
  const response = await client.fetch<Response>(`api/portals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.json();
  return data as Portal;
};
export const updatePortalQuery = async (
  client: IHttpClient,
  body: Portal,
  portalId: string
) => {
  const response = await client.fetch<Response>(`api/portals/${portalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.json();
  return data as Portal;
};

export const getPortalByIdQuery = async (
  client: IHttpClient,
  activePortalId?: string,
  signal?: AbortSignal
) => {
  const response = await client.fetch(`api/portals/${activePortalId}`, {
    method: "GET",
    signal,
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.json();
  return data as Portal;
};

export const getPortalAppsQuery = async (
  client: IHttpClient,
  activePortalId?: string,
  signal?: AbortSignal
) => {
  const response = await client.fetch(`api/portals/${activePortalId}/apps`, {
    method: "GET",
    signal,
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.json();
  return data as Portal;
};
