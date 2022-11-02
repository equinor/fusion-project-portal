import { useCallback, useEffect, useState } from 'react';

import { Card, Typography } from '@equinor/eds-core-react';
import {
  ContextModule,
  QueryContextParameters,
} from '@equinor/fusion-framework-module-context';
import { useFramework } from '@equinor/fusion-framework-react/hooks';
import { useObservableSelectorState } from '@equinor/fusion-observable/react';
import { useObservable } from '@equinor/portal-utils';
import { useParams } from 'react-router-dom';

import { StyledMain } from '../common-styles/Styles';
import { GridItem, StyledGrid } from './ContextPageStyles';

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
      <StyledGrid>
        <GridItem columnName="column-1">
          <Card.Header>
            <Card.HeaderTitle title={`Welcome to ${contextValue?.title}`}>
              <Typography variant="h6">
                Welcome to {contextValue?.title}
              </Typography>
              <Typography>{contextValue?.type.id}</Typography>
            </Card.HeaderTitle>
          </Card.Header>
        </GridItem>
        <GridItem columnName="column-1">
          <Card.Header>
            <Card.HeaderTitle>
              <Typography variant="h6">Some KPI...</Typography>
            </Card.HeaderTitle>
          </Card.Header>
        </GridItem>
        <GridItem columnName="column-1">
          <Card.Header>
            <Card.HeaderTitle>
              <Typography variant="h6">Some KPI...</Typography>
            </Card.HeaderTitle>
          </Card.Header>
        </GridItem>
        <GridItem columnName="column-2" rowStart={true}>
          <Card.Header>
            <Card.HeaderTitle>
              <Typography variant="h6">Work assigned</Typography>
            </Card.HeaderTitle>
          </Card.Header>
        </GridItem>
      </StyledGrid>
    </StyledMain>
  );
};
