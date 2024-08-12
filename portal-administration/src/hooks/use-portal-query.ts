import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppModules } from "@equinor/fusion-framework-react-app";
import { FormattedError, Portal } from "../types";
import { createPortalQuery, getPortalsQuery } from "../querty/portal-query";

export const useGetPortals = () => {
  const client = useAppModules().http.createClient("portal-client");

  return useQuery<Portal[], FormattedError>({
    queryKey: ["portals"],
    queryFn: ({ signal }) => getPortalsQuery(client, signal),
  });
};

export const useCreatePortal = () => {
  const client = useAppModules().http.createClient("portal-client");

  const queryClient = useQueryClient();

  return useMutation<Portal, FormattedError, Portal, Portal>({
    mutationKey: ["create-portal"],
    mutationFn: (body) => createPortalQuery(client, body),
    onSuccess() {
      queryClient.invalidateQueries(["create-portal"]);
    },
  });
};

export const useUpdatePortal = () => {
  const client = useAppModules().http.createClient("portal-client");

  const queryClient = useQueryClient();

  return useMutatxion<Portal, FormattedError, Portal, Portal>({
    mutationKey: ["update-portal", poralId],
    mutationFn: (body) => createPortalQuery(client, body),
    onSuccess() {
      queryClient.invalidateQueries(["create-portal"]);
    },
  });
};
