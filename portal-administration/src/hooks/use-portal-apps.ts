import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AppManifestResponse, FormattedError, PortalApp } from "../types";

import { useHttpClient } from "@equinor/fusion-framework-react-app/http";
import {
  Result,
  addPortalApps,
  getPortalAppsById,
  removePortalApps,
} from "../query/apps-queries";
import { useSnackBar } from "./use-snack-bar";
import {
  mutateDeletePortalApps,
  mutatePortalApps as mutateAddPortalApps,
} from "../query/apps-mutations";

export const useGetPortalApps = (portalId?: string) => {
  const client = useHttpClient("portal-client");

  return useQuery<AppManifestResponse[], FormattedError>({
    queryKey: ["portal-apps", portalId],
    queryFn: ({ signal }) => getPortalAppsById(client, portalId, signal),
    enabled: Boolean(portalId),
  });
};

export const useAddPortalApps = (portalId?: string) => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();
  const { sendMessage } = useSnackBar();

  return useMutation<
    Result[],
    FormattedError,
    PortalApp[],
    { prevApps: AppManifestResponse[]; newApps: AppManifestResponse[] }
  >({
    mutationFn: (apps) => addPortalApps(client, apps, portalId),
    onMutate: (apps) => {
      return mutateAddPortalApps(queryClient, portalId, apps);
    },
    onError(_err, _apps, context) {
      sendMessage("Apps failed to be added", "Error");
      queryClient.setQueryData(
        ["portal-apps", portalId],
        context?.prevApps || []
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["portal-apps", portalId] });
      sendMessage("Apps added successful", "Info");
    },
  });
};

export const useRemovePortalApps = (portalId?: string) => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();
  const { sendMessage } = useSnackBar();

  return useMutation<
    Result[],
    FormattedError,
    PortalApp[],
    { prevApps: AppManifestResponse[]; newApps: AppManifestResponse[] }
  >({
    mutationFn: (apps) => removePortalApps(client, apps, portalId),
    onMutate: (apps) => {
      return mutateDeletePortalApps(queryClient, portalId, apps);
    },
    onError: (_err, _apps, context) => {
      sendMessage("Failed to remove apps from portal", "Error");
      queryClient.setQueryData(
        ["portal-apps", portalId],
        context?.prevApps || []
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["portal-apps", portalId] });
      sendMessage("Apps removed successfully", "Info");
    },
  });
};
