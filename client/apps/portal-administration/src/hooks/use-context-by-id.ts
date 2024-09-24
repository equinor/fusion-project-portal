import { useQuery } from "@tanstack/react-query";
import { useResolver } from "./use-resolver";

export const useContextById = (id?: string) => {
  const { getContextById } = useResolver();

  return useQuery<any | undefined>({
    queryKey: ["context", id],
    queryFn: async () => await getContextById(id),
    enabled: Boolean(id),
  });
};
