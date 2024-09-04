import { useMemo } from "react";
import { useOnboardedApps } from "./use-onboarded-apps";
import { useGetPortalApps } from "./use-portal-apps";
import { useGetPortal } from "./use-portal-query";
import { PortalApp } from "../types";

export const useOnboardApps = (portalId?: string) => {
  const { data: onboardedApps, isLoading: onboardedAppsIsLoading } =
    useOnboardedApps();
  const { data: portalApps, isLoading: portalAppsIsLoading } =
    useGetPortalApps(portalId);

  const { data: portalData, isLoading: portalIsLoading } =
    useGetPortal(portalId);

  const onboardAppsList = useMemo(() => {
    if (!onboardedApps || !portalApps || !portalData) {
      return [];
    }

    const portalHasContext = portalData?.contexts.length > 0;
    const portalContexts = portalData?.contexts;

    return onboardedApps.reduce((acc, app) => {
      const isActive = Boolean(
        portalApps.find((portalApp) => portalApp.key === app.appKey)
      );

      if (
        portalHasContext &&
        portalContexts.find((context) =>
          app.contexts.find((appContext) => appContext.type === context.type)
        )
      ) {
        acc.push({ ...app, isActive });
      } else if (!portalHasContext || app.contexts.length === 0) {
        acc.push({ ...app, isActive });
      }
      return acc;
    }, [] as PortalApp[]);
  }, [onboardedApps, portalApps, portalData]);

  return {
    data: onboardAppsList,
    isLoading: onboardedAppsIsLoading || portalAppsIsLoading || portalIsLoading,
  };
};
