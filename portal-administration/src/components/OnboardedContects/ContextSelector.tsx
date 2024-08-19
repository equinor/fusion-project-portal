import {
  SearchableDropdownResultItem,
  SearchableDropdownResult,
} from "@equinor/fusion-react-searchable-dropdown";
import { QueryContextResponse } from "@equinor/fusion-framework-module-services/context/query";
import { ServicesModule } from "@equinor/fusion-framework-module-services";
import { ContextApiClient } from "@equinor/fusion-framework-module-services/context";
import { useFramework } from "@equinor/fusion-framework-react";
import { useCallback, useEffect, useState } from "react";
import { Autocomplete, Typography } from "@equinor/eds-core-react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

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

function contextResultMappedByTypes(
  contexts: QueryContextResponse<"v1">
): SearchableDropdownResult {
  return contexts.reduce((result, context) => {
    const index = result.findIndex((r) => r.title === context.type.id);
    if (index === -1) {
      result.push(
        singleItem({
          id: context.type.id,
          title: context.type.id,
          type: "section",
          children: [
            singleItem({
              id: context.id,
              title: context.title || "",
              subTitle: context.type?.id,
            }),
          ],
        })
      );
      return result;
    }

    result[index].children?.push(
      singleItem({
        id: context.id,
        title: context.title || "",
      })
    );

    return result;
  }, [] as SearchableDropdownResult);
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

export const useContextSearch = (searchText: string, types: string[]) => {
  const { searchQuery } = useResolver(types);

  return useQuery<SearchableDropdownResult>({
    queryKey: ["contexts", ...types, searchText],
    queryFn: async () => await searchQuery(searchText),
    enabled: Boolean(searchText),
  });
};

export const useContextById = (id?: string) => {
  const { getContextById } = useResolver();

  return useQuery<any | undefined>({
    queryKey: ["context", id],
    queryFn: async () => await getContextById(id),
    enabled: Boolean(id),
  });
};

export const ContextSelector = ({
  types,
  onChange,
}: {
  types: string[];
  onChange: (context: SearchableDropdownResultItem) => void;
}) => {
  const [input, setInput] = useState<string>("");
  const { data, isLoading } = useContextSearch(input, types);

  const search = async (input: string) => {
    setInput(input);
  };

  return (
    <Autocomplete<SearchableDropdownResultItem>
      id="app-context-types"
      onInputChange={search}
      options={data || []}
      loading={isLoading}
      onOptionsChange={(value) => {
        onChange(value?.selectedItems[0]);
      }}
      noOptionsText={isLoading ? "Loading data.." : "No options"}
      optionComponent={CustomItem}
      optionLabel={(contextTypes) => contextTypes.title || "Not found"}
      itemCompare={(item, compare) => {
        return item === compare;
      }}
      optionsFilter={() => true}
      label="Search Context"
      multiline
    />
  );
};

const Style = {
  ItemWrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 0rem;
    min-width: 500px;
    gap: 0.25rem;
  `,
};

function CustomItem(option: SearchableDropdownResultItem) {
  const { title, subTitle } = option;
  return (
    <Style.ItemWrapper>
      <Typography variant="h5">{title}</Typography>
      <Typography group="paragraph" variant="caption">
        {subTitle}
      </Typography>
    </Style.ItemWrapper>
  );
}
