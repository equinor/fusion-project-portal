import {
  IHttpClient,
  useHttpClient,
} from "@equinor/fusion-framework-react-app/http";
import { useMutation } from "@tanstack/react-query";
import { OnboardedContext, PortalApp } from "../types";

type ContextAppResult = {
  appKey: string;
  contextId: string;
  status: "failed" | "success";
};

export const useAddAppWithContext = (portalId?: string) => {
  const client = useHttpClient("portal");

  return useMutation({
    mutationFn: async ({
      appsSelection,
      contextSelection,
    }: {
      appsSelection: PortalApp[];
      contextSelection: OnboardedContext[];
    }) => {
      return addPortalAppsWithContexts(
        client,
        appsSelection,
        contextSelection,
        portalId
      );
    },
  });
};

const addPortalAppWithContext = async (
  client: IHttpClient,
  contextId: string,
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
    return { appKey, contextId, status: "failed" } as ContextAppResult;
  }

  return { appKey, status: "success" } as ContextAppResult;
};

const addPortalAppWithContexts = async (
  client: IHttpClient,
  appKey: string,
  contexts: OnboardedContext[],
  portalId?: string
) => {
  if (!portalId) return [] as ContextAppResult[];
  const results: ContextAppResult[] = [];

  for (const context of contexts) {
    const result = await addPortalAppWithContext(
      client,
      context.contextId,
      appKey,
      portalId
    );
    results.push(result);
  }

  return results as ContextAppResult[];
};

const addPortalAppsWithContexts = async (
  client: IHttpClient,
  portalApps: PortalApp[],
  contexts: OnboardedContext[],
  portalId?: string
) => {
  if (!portalId) return [] as ContextAppResult[];
  const results: ContextAppResult[] = [];

  for (const app of portalApps) {
    const result = await addPortalAppWithContexts(
      client,
      app.appKey,
      contexts,
      portalId
    );
    results.push(...result);
  }

  return results as ContextAppResult[];
};
