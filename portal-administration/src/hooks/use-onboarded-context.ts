import { useHttpClient } from "@equinor/fusion-framework-react-app/http";
import { FormattedError, OnboardedContext } from "../types";
import {
  getOnboardedContextQuery,
  onboardContext,
  updateOnboardedContext,
} from "../query/onboarded-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ussOnboardedContexts = () => {
  const client = useHttpClient("portal-client");

  return useQuery<OnboardedContext[], FormattedError>({
    queryKey: ["onboarded-contexts"],
    queryFn: ({ signal }) => getOnboardedContextQuery(client, signal),
  });
};

export const useEditOnboardContext = () => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();

  return useMutation<
    string,
    FormattedError,
    OnboardedContext,
    OnboardedContext
  >({
    mutationKey: ["onboarded-context"],
    mutationFn: (body) => updateOnboardedContext(client, body),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["onboarded-contexts"] });
    },
  });
};

export const useOnboardContext = () => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();

  return useMutation<
    string,
    FormattedError,
    Pick<OnboardedContext, "externalId" | "type" | "description">,
    string
  >({
    mutationFn: (type) => onboardContext(client, type),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["context-types"] });
    },
  });
};
export const useFusionContextsContext = () => {
  const client = useHttpClient("context");

  const queryClient = useQueryClient();

  return useMutation<
    string,
    FormattedError,
    Pick<OnboardedContext, "externalId" | "type" | "description">,
    string
  >({
    mutationFn: (type) => onboardContext(client, type),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["context-types"] });
    },
  });
};
// export const useRemoveContextType = () => {
//   const client = useHttpClient("portal-client");

//   const queryClient = useQueryClient();

//   return useMutation<boolean, FormattedError, string, string>({
//     mutationFn: (type) => removeContextType(client, type),
//     onSuccess() {
//       queryClient.invalidateQueries({ queryKey: ["context-types"] });
//     },
//   });
// };
