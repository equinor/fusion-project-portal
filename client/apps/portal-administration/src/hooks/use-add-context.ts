import {
  IHttpClient,
  useHttpClient,
} from "@equinor/fusion-framework-react-app/http";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSnackBar } from "./use-snack-bar";
import { FormattedError } from "../types";

import { formatError } from "../utils/error-utils";

export type AddContext = {
  externalId: string;
  type: string;
  description: string;
};

export const useAddContext = () => {
  const client = useHttpClient("portal-client");

  const queryClient = useQueryClient();

  const { sendMessage } = useSnackBar();

  return useMutation<string, FormattedError, AddContext, AddContext>({
    mutationFn: async (data) => {
      return await addContext(client, data);
    },
    onError() {
      sendMessage("Failed to add context", "Error");
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["create-portal"] });
      sendMessage("Add context success", "Info");
    },
  });
};

const addContext = async (client: IHttpClient, body: AddContext) => {
  const response = await client.fetch<Response>(`api/onboarded-contexts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw formatError(await response.json(), response.status);
  }

  const data = await response.text();
  return data;
};
