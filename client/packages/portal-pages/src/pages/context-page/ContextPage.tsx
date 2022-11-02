import { useCallback, useEffect, useState } from 'react';

import {
  ContextModule,
  QueryContextParameters,
} from '@equinor/fusion-framework-module-context';
import { useFramework } from '@equinor/fusion-framework-react/hooks';
import { useObservableSelectorState } from '@equinor/fusion-observable/react';
import { useObservable } from '@equinor/portal-utils';

const useContextQuery = () => {
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

export const Wrapper = styled.section`
  padding: 10rem 5rem 0rem 5rem;
`;

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';

export const ContextPage = (): JSX.Element => {
  const { contextValue, setContext } = useContextQuery();
  const { contextId } = useParams();
  useEffect(() => {
    if (!contextValue && contextId) {
      setContext(contextId);
    }
  }, [contextValue, contextId]);

  return (
    <StyledMain>
      <StyledBackgroundSection>
        <Wrapper>
          <h1>
            {contextValue?.title} - {contextValue?.type.id}
          </h1>
          <p>{JSON.stringify(contextValue)}</p>
        </Wrapper>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
