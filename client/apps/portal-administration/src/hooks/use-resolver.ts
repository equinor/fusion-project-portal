import {
  SearchableDropdownResultItem,
  SearchableDropdownResult,
} from "@equinor/fusion-react-searchable-dropdown";
import { QueryContextResponse } from "@equinor/fusion-framework-module-services/context/query";
import { ServicesModule } from "@equinor/fusion-framework-module-services";
import { ContextApiClient } from "@equinor/fusion-framework-module-services/context";
import { useFramework } from "@equinor/fusion-framework-react";
import { useCallback, useEffect, useState } from "react";

const singleItem = (props: unknown): SearchableDropdownResultItem => {
  return Object.assign({ id: "0", title: "Dummy title" }, props);
};

function contextResultMapped(
  contexts: QueryContextResponse<"v1">
): SearchableDropdownResult {
  return contexts.map((context) =>
    singleItem({
      id: context.id,
      title: context.title,
      subTitle: context.type?.id,
    })
  );
}

const minQueryLength = 3;

export const useResolver = (type: string[] = []) => {
  const [client, setClient] = useState<ContextApiClient<"json"> | null>(null);

  const { modules } = useFramework<[ServicesModule]>();
  const ct = useFramework().modules.serviceDiscovery.createClient("context");
  useEffect(() => {
    modules.services.createContextClient("json").then(setClient);
  }, [modules.services, setClient]);

  const searchQuery = useCallback(
    async (search: string): Promise<SearchableDropdownResult> => {
      let searchResult: SearchableDropdownResult = [];
      if (!client) {
        return [];
      }

      try {
        if (!search || search.length < minQueryLength) {
          searchResult.push(
            singleItem({
              title: `Need ${minQueryLength - search.length} more chars`,
              isDisabled: true,
            })
          );
          return searchResult;
        }

        const contexts = await client.query("v1", {
          query: { search, filter: { type } },
        });

        if (contexts[0] && !contexts[0].id) return searchResult;
        // Structure as type
        searchResult = contextResultMapped(contexts);

        if (searchResult.length === 0) {
          searchResult.push(
            singleItem({ title: "No matches...", isDisabled: true })
          );
        }

        return searchResult;
      } catch (e) {
        return [
          singleItem({
            title: "API Error",
            subTitle: e,
            isDisabled: true,
            isError: true,
          }),
        ];
      }
    },
    [client, type]
  );

  const getContextById = useCallback(
    async (id?: string): Promise<QueryContextResponse<"v1"> | undefined> => {
      if (!client) {
        return;
      }

      try {
        return await client.get("v1", {
          id: id || "",
        });
      } catch (e) {
        return;
      }
    },
    [client, type]
  );

  return { searchQuery, getContextById };
};
