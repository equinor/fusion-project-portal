import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppModules } from "@equinor/fusion-framework-react-app";
import { ContextType, FormattedError } from "../types";
import {
  createContextType,
  getContextTypesQuery,
  removeContextType,
} from "../query/context-type-query";
import { ContextTypeInputs } from "../schema";

export const useGetContextTypes = () => {
  const client = useAppModules().http.createClient("portal-client");

  return useQuery<ContextType[], FormattedError>({
    queryKey: ["context-types"],
    queryFn: ({ signal }) => getContextTypesQuery(client, signal),
  });
};

export const useCreateContextType = () => {
  const client = useAppModules().http.createClient("portal-client");

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
      queryClient.invalidateQueries(["create-context-type"]);
      queryClient.invalidateQueries(["context-types"]);
    },
  });
};
export const useRemoveContextType = () => {
  const client = useAppModules().http.createClient("portal-client");

  const queryClient = useQueryClient();

  return useMutation<boolean, FormattedError, string, string>({
    mutationFn: (type) => removeContextType(client, type),
    onSuccess() {
      queryClient.invalidateQueries(["context-types"]);
    },
  });
};
