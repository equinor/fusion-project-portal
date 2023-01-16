import { CircularProgress } from '@equinor/eds-core-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './header';
import { PropsProvider } from '../hooks/useWidgetProps';
import { useBookmarks } from '../hooks/useBookmarks';

import styled from 'styled-components';
import React from 'react';

export type BookmarkWidgetProps = {
  isOpen: boolean;
  close: VoidFunction;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function BookmarkWidget(props: BookmarkWidgetProps) {
  return (
    <StyledBookmarksRoot>
      <QueryClientProvider client={queryClient}>
        <PropsProvider value={props}>
          <BookmarkDataLoader />
        </PropsProvider>
      </QueryClientProvider>
    </StyledBookmarksRoot>
  );
}

const StyledBookmarksRoot = styled.div`
  height: calc(100% - 16px) px;
  width: calc(100% - 16px) px;
  background: white;
  margin: 16px;
`;

export function BookmarkDataLoader() {
  const { data, isLoading, error } = useBookmarks();

  return (
    <div>
      <Header />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <pre>{data && JSON.stringify(data)}</pre>
          {/* <Filter /> */}
          {/* Map sections 
      <Section ><Row /> </Section>
    */}
        </div>
      )}
    </div>
  );
}
