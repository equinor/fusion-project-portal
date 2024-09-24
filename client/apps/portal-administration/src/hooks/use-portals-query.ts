import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "@equinor/fusion-framework-react-app/http";

import { Portal } from "../types";

export const usePortalsQuery = () => {
  const client = useHttpClient("portal-client");

  return useQuery<Portal[]>({
    queryKey: ["portals"],
    queryFn: async () =>
      await client.fetch("api/portals").then((res) => res.json()),
  });
};
