import { IHttpClient } from "@equinor/fusion-framework-react-app/http";
import { formatError } from "../utils/error-utils";
import { OnboardedContext } from "../types";

export const getOnboardedContextQuery = async (
  client: IHttpClient,
  signal?: AbortSignal
) => {
  const response = await client.fetch(`api/onboarded-contexts`, {
    method: "GET",
    signal,
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.json();
  return data as OnboardedContext[];
};

export const searchFusionContexts = async (
  client: IHttpClient,
  body: Pick<OnboardedContext, "externalId" | "type" | "description">
) => {
  const response = await client.fetch<Response>(`api/onboarded-contexts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.text();
  return data as string;
};

export const onboardContext = async (
  client: IHttpClient,
  body: Pick<OnboardedContext, "externalId" | "type" | "description">
) => {
  const response = await client.fetch<Response>(`api/onboarded-contexts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.text();
  return data as string;
};

export const updateOnboardedContext = async (
  client: IHttpClient,
  body: Pick<OnboardedContext, "id" | "description">
) => {
  const response = await client.fetch<Response>(
    `api/onboarded-contexts/${body.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.text();
  return data as string;
};

export const removeOnboardedContext = async (
  client: IHttpClient,
  id: string
) => {
  const response = await client.fetch<Response>(
    `api/onboarded-contexts/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }
  return true;
};
