import { act, useMemo } from "react";
import { usePortalContext } from "../context/PortalContext";
import { useOnboardedContexts } from "./use-onboarded-context";
import { useGetPortal } from "./use-portal-query";

export const useActiveOnboardedContext = () => {
  const { activePortalId } = usePortalContext();
  const { isLoading: isLoadingPortalConfig, data: portalConfig } =
    useGetPortal(activePortalId);
  const { isLoading, data: onboardedContexts } = useOnboardedContexts();

  const activeContexts = useMemo(() => {
    if (!portalConfig || !onboardedContexts) return [];
    return onboardedContexts.filter((context) =>
      portalConfig.contexts.map((c) => c.type).includes(context.type)
    );
  }, [portalConfig, onboardedContexts]);

  return {
    activeContexts,
    isLoading: isLoading || isLoadingPortalConfig,
    contextTypes: portalConfig?.contexts.map((c) => c.type),
  };
};
