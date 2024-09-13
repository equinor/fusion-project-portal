import { useHttpClient } from "@equinor/fusion-framework-react-app/http";
import { FormattedError, OnboardedContext } from "../types";
import {
  getOnboardedContextQuery,
  onboardContext,
  updateOnboardedContext,
} from "../query/onboarded-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackBar } from "./use-snack-bar";

export const useOnboardedContexts = () => {
  const client = useHttpClient("portal-client");

  return useQuery<OnboardedContext[], FormattedError>({
    queryKey: ["onboarded-contexts"],
    queryFn: ({ signal }) => getOnboardedContextQuery(client, signal),
  });
};

export const useEditOnboardContext = () => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();

  const { sendMessage } = useSnackBar();

  return useMutation<
    string,
    FormattedError,
    OnboardedContext,
    OnboardedContext
  >({
    mutationKey: ["onboarded-context"],
    mutationFn: (body) => updateOnboardedContext(client, body),

    onError() {
      sendMessage("Context update failed", "Error");
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["onboarded-contexts"] });
      sendMessage("Context update successful", "Info");
    },
  });
};

export const useOnboardContext = () => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();
  const { sendMessage } = useSnackBar();

  return useMutation<
    string,
    FormattedError,
    Pick<OnboardedContext, "externalId" | "type" | "description">,
    string
  >({
    mutationFn: (type) => onboardContext(client, type),
    onError() {
      sendMessage("Context creation failed", "Error");
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["context-types"] });
      sendMessage("Context onboarded successful", "Info");
    },
  });
};
