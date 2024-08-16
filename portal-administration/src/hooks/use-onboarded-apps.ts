import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormattedError, PortalApp, PortalAppMutation } from "../types";
import { useHttpClient } from "@equinor/fusion-framework-react-app/http";

export const useOnboardedApps = () => {
  const client = useHttpClient("portal-client");

  return useQuery<PortalApp[]>({
    queryKey: ["onboarded-apps"],
    queryFn: async () =>
      await client
        .fetch("api/onboarded-apps")
        .then((response) => response.json()),
  });
};

export const useAddOnboardedApp = () => {
  const client = useHttpClient("portal-client");

  return useQuery<PortalApp[]>({
    queryKey: ["onboarded-apps"],
    queryFn: async () =>
      await client
        .fetch("api/onboarded-apps")
        .then((response) => response.json()),
  });
};

export const useEditOnboardedApp = (appKey?: string) => {
  const client = useHttpClient("portal-client");
  const queryClient = useQueryClient();
  return useMutation<
    PortalAppMutation,
    FormattedError,
    PortalAppMutation,
    PortalAppMutation
  >({
    mutationKey: ["onboarded-app", appKey],
    mutationFn: async (body) => {
      console.log(body);
      return await client
        .fetch(`api/onboarded-apps/${appKey}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
        .then((response) => response.json());
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["onboarded-apps"] });
    },
  });
};
