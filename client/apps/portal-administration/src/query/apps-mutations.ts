import { QueryClient } from "@tanstack/react-query";
import { PortalApp, AppManifestResponse } from "../types";

export const mutatePortalApps = (
  queryClient: QueryClient,
  portalId: string | undefined,
  apps: PortalApp[]
) => {
  queryClient.cancelQueries({ queryKey: ["portal-apps", portalId] });

  const prevApps =
    queryClient.getQueryData<AppManifestResponse[]>([
      "portal-apps",
      portalId,
    ]) || [];

  const newApps = [
    ...prevApps,
    ...apps.map((a) => ({
      key: a.appKey,
      contextTypes: a.contexts,
      appManifest: {
        key: a.appKey,
        name: a.name,
        description: a.description,
      },
    })),
  ] as AppManifestResponse[];

  queryClient.setQueryData(["portal-apps", portalId], newApps);
  return { prevApps, newApps };
};

export const mutateDeletePortalApps = (
  queryClient: QueryClient,
  portalId: string | undefined,
  apps: PortalApp[]
) => {
  queryClient.cancelQueries({ queryKey: ["portal-apps", portalId] });
  const prevApps =
    queryClient.getQueryData<AppManifestResponse[]>([
      "portal-apps",
      portalId,
    ]) || [];

  const appKeys = apps.map((a) => a.appKey);
  const newApps = prevApps?.filter((a) => !appKeys.includes(a.key));
  queryClient.setQueryData(["portal-apps", portalId], newApps);
  return { prevApps, newApps };
};
