import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ContextType, FormattedError } from "../types";
import { useHttpClient } from "@equinor/fusion-framework-react-app/http";
import {
  createContextType,
  getContextTypesQuery,
  removeContextType,
} from "../query/context-type-query";
import { ContextTypeInputs } from "../schema";

export const useGetContextTypes = () => {
  const client = useHttpClient("portal-client");

  return useQuery<ContextType[], FormattedError>({
    queryKey: ["context-types"],
    queryFn: ({ signal }) => getContextTypesQuery(client, signal),
  });
};

export const useCreateContextType = () => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();

  return useMutation<
    ContextTypeInputs,
    FormattedError,
    ContextTypeInputs,
    ContextTypeInputs
  >({
    mutationKey: ["create-context-type"],
    mutationFn: (body) => createContextType(client, body),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["create-context-type"] });
      queryClient.invalidateQueries({ queryKey: ["context-types"] });
    },
  });
};
export const useRemoveContextType = () => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();

  return useMutation<boolean, FormattedError, string, string>({
    mutationFn: (type) => removeContextType(client, type),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["context-types"] });
    },
  });
};
