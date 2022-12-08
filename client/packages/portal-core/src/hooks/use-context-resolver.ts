import ContextApiClient from '@equinor/fusion-framework-module-services/context';
import { QueryContextResponse } from '@equinor/fusion-framework-module-services/context/query';
import {
  ContextResult,
  ContextResultItem,
} from '@equinor/fusion-react-context-selector';
import { useCallback } from 'react';
import { getContextHistory } from '../framework-configurator/portal-context-history';
import { useContextClient } from './use-context-client';
ContextApiClient;

export const useContextResolver = (type: string[]) => {
  const client = useContextClient('json');
  const minQueryLength = 3;

  const searchQuery = useCallback(
    async (search: string): Promise<ContextResult> => {
      let searchResult: ContextResult = [];
      if (!client) {
        return [
          singleItem({
            title: 'Client Error',
            subTitle: 'No client provided to framework',
            isDisabled: true,
            isError: true,
          }),
        ];
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

        const contexts = await client.query('v1', {
          query: { search, filter: { type } },
        });

        // Structure as type

        searchResult =
          type.length > 1
            ? contextResultMappedByTypes(contexts)
            : contextResultMapped(contexts);
        searchResult.length > 0 && console.log(searchResult);

        if (searchResult.length === 0) {
          searchResult.push(
            singleItem({ title: 'No matches...', isDisabled: true })
          );
        }

        return searchResult;
      } catch (e) {
        return [
          singleItem({
            title: 'API Error',
            subTitle: e,
            isDisabled: true,
            isError: true,
          }),
        ];
      }
    },
    [client]
  );

  return {
    searchQuery,
    initialResult: getContextHistory(),
  };
};

const singleItem = (props: unknown): ContextResultItem => {
  return Object.assign({ id: '0', title: 'Dummy title' }, props);
};

function contextResultMappedByTypes(
  contexts: QueryContextResponse<'v1'>
): ContextResult {
  return contexts.reduce((result, context) => {
    const index = result.findIndex((r) => r.title === context.type.id);
    if (index === -1) {
      result.push(
        singleItem({
          id: context.type.id,
          title: context.type.id,
          type: 'section',
          children: [singleItem({ id: context.id, title: context.title! })],
        })
      );
      return result;
    }

    result[index].children?.push(
      singleItem({
        id: context.id,
        title: context.title!,
      })
    );

    return result;
  }, [] as ContextResult);
}

function contextResultMapped(
  contexts: QueryContextResponse<'v1'>
): ContextResult {
  return contexts.map((context) =>
    singleItem({
      id: context.id,
      title: context.title!,
    })
  );
}
