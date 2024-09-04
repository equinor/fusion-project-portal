import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormattedError, Portal } from "../types";
import {
  createPortalQuery,
  getPortalByIdQuery,
  getPortalsQuery,
  updatePortalQuery,
} from "../query/portal-query";
import { PortalCreateInputs, PortalEditInputs } from "../schema";
import { useHttpClient } from "@equinor/fusion-framework-react-app/http";
import { useSnackBar } from "./use-snack-bar";

export const useGetPortals = () => {
  const client = useHttpClient("portal-client");

  return useQuery<Portal[], FormattedError>({
    queryKey: ["portals"],
    queryFn: ({ signal }) => getPortalsQuery(client, signal),
  });
};

export const useGetPortal = (portalId?: string) => {
  const client = useHttpClient("portal-client");

  return useQuery<Portal, FormattedError>({
    queryKey: ["portal", { portalId }],
    queryFn: ({ signal }) => getPortalByIdQuery(client, portalId, signal),
    enabled: Boolean(portalId),
  });
};

export const useCreatePortal = () => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();

  const { sendMessage } = useSnackBar();

  return useMutation<
    PortalCreateInputs,
    FormattedError,
    PortalCreateInputs,
    PortalCreateInputs
  >({
    mutationKey: ["create-portal"],
    mutationFn: (body) => createPortalQuery(client, body),
    onError() {
      sendMessage("Failed to create portal", "Error");
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["create-portal"] });
      sendMessage("Portal created success", "Info");
    },
  });
};

export const useUpdatePortal = (portalId: string) => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();

  const { sendMessage } = useSnackBar();

  return useMutation<
    boolean,
    FormattedError,
    PortalEditInputs,
    PortalEditInputs
  >({
    mutationKey: ["portal", { portalId }],
    mutationFn: (body) => updatePortalQuery(client, body),
    onError() {
      sendMessage("Failed to update portal", "Error");
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["portal"] });
      sendMessage("Portal updated success", "Info");
    },
  });
};
