import { IHttpClient } from "@equinor/fusion-framework-module-http";
import { formatError } from "../utils/error-utils";
import { CreatePortal, Portal } from "../types";
import { PortalCreateInputs, PortalEditInputs } from "../schema";

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

export const createPortalQuery = async (
  client: IHttpClient,
  body: PortalCreateInputs
) => {
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
  return data as PortalCreateInputs;
};

export const updatePortalQuery = async (
  client: IHttpClient,
  body: PortalEditInputs
) => {
  const response = await client.fetch<Response>(`api/portals/${body.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  return response.ok;
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
  return data as any;
};
