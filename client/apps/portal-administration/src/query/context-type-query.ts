import { IHttpClient } from "@equinor/fusion-framework-module-http";
import { formatError } from "../utils/error-utils";
import { ContextType } from "../types";
import { ContextTypeInputs } from "../schema";

export const getContextTypesQuery = async (
  client: IHttpClient,
  signal?: AbortSignal
) => {
  const response = await client.fetch(`api/context-types`, {
    method: "GET",
    signal,
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.json();
  return data as ContextType[];
};

export const createContextType = async (
  client: IHttpClient,
  body: ContextTypeInputs
) => {
  const response = await client.fetch<Response>(`api/context-types`, {
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
  return data as ContextTypeInputs;
};

export const removeContextType = async (client: IHttpClient, type: string) => {
  const response = await client.fetch<Response>(`api/context-types/${type}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }
  return true;
};
