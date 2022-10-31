import { useCallback, useEffect, useState } from 'react';

import {
  ContextModule,
  QueryContextParameters
} from '@equinor/fusion-framework-module-context';
import { useFramework } from '@equinor/fusion-framework-react/hooks';
import { useObservableSelectorState } from '@equinor/fusion-observable/react';

const useContextQuery = () => {
  const {
    modules: { context },
  } = useFramework<[ContextModule]>();
  const [result, setResult] = useState<unknown>(null);

  const search = useCallback(
    (args: QueryContextParameters) => {
      context.queryClient.query(args).subscribe(setResult);
    },
    [context]
  );

  const setContext = useCallback(
    (_context: string) => {
      context.contextClient.setCurrentContext(_context);
    },
    [context]
  );

  const status = useObservableSelectorState(
    context.queryClient.client,
    (x: any) => x.status
  );

  useEffect(() => {
    context.queryClient.client.status;
  }, []);

  return {
    search,
    result,
    status,
    setContext,
    contextValue: context.contextClient.currentContext,
  };
};

export const QueryContext = () => {
  const [query, setQuery] = useState<string>('');
  const { result, search, status, setContext, contextValue } =
    useContextQuery();
  useEffect(() => {
    if (query.length > 2) {
      search({ search: query });
    }
  }, [query, search]);
  console.log('contextValue', contextValue);
  return (
    <div>
      <input type="search" onChange={(e) => setQuery(e.currentTarget.value)} />
      <span>status: {status}</span>
      <div>
        {status === 'active' && <p>Loading data</p>}
        {status === 'idle' && <pre>{JSON.stringify(result, undefined, 4)}</pre>}
      </div>

      <input type="test" onChange={(e) => setContext(e.currentTarget.value)} />
    </div>
  );
};

export default QueryContext;
