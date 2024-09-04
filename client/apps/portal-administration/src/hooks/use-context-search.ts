import { SearchableDropdownResult } from "@equinor/fusion-react-searchable-dropdown";
import { useResolver } from "./use-resolver";
import { useQuery } from "@tanstack/react-query";

export const useContextSearch = (searchText: string, types: string[]) => {
  const { searchQuery } = useResolver(types);

  return useQuery<SearchableDropdownResult>({
    queryKey: ["contexts", ...types, searchText],
    queryFn: async () => await searchQuery(searchText),
    enabled: Boolean(searchText),
  });
};
