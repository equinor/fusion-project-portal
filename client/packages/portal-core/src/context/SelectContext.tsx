import { useCallback, useEffect, useState } from 'react';

import {
  ContextModule,
  QueryContextParameters,
} from '@equinor/fusion-framework-module-context';
import { useFramework } from '@equinor/fusion-framework-react/hooks';
import { useObservableSelectorState } from '@equinor/fusion-observable/react';
import { useObservable } from '@equinor/portal-utils';
import { useNavigate } from 'react-router-dom';
import { useCurrentWorkSurface } from '../work-surface-module';

export const useContextQuery = () => {
  const {
    modules: { context },
  } = useFramework<[ContextModule]>();
  const [result, setResult] = useState<any>(null);

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

  const contextValue = useObservable(context.contextClient.currentContext$);

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
    contextValue,
  };
};

export const QueryContext = () => {
  const [query, setQuery] = useState<string>('');
  const { result, search, status, setContext, contextValue } =
    useContextQuery();
  const navigate = useNavigate();
  const currentWorkSurface = useCurrentWorkSurface();

  useEffect(() => {
    if (query.length > 2) {
      search({
        search: query,
        filter: {
          type: ['Facility', 'ProjectMaster'],
        },
      });
    }
  }, [query, search]);

  return (
    <div>
      <p>My Context</p>
      {contextValue ? (
        <h1>
          <>
            {contextValue?.title} - {contextValue.type.id}
          </>
        </h1>
      ) : (
        <p>No context selected</p>
      )}
      <input type="search" onChange={(e) => setQuery(e.currentTarget.value)} />
      <span>status: {status}</span>
      <div>
        {status === 'active' && <p>Loading data</p>}
        {status === 'idle' &&
          result &&
          result.value.slice(1, 10).map((c: any) => {
            return (
              <div
                key={c.id}
                onClick={() => {
                  setContext(c.id);
                  currentWorkSurface?.shortName &&
                    navigate(
                      `/${currentWorkSurface.name
                        .toLowerCase()
                        .replace(' ', '-')}/${c.id}`
                    );
                }}
              >
                <span>
                  {c.title} - {c.type.id}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default QueryContext;
