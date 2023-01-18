import { Icon } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_right,
  share,
  more_vertical,
} from '@equinor/eds-icons';
import { QueryClient, QueryClientProvider } from 'react-query';

Icon.add({
  chevron_down,
  chevron_right,
  share,
  more_vertical,
});

import styled from 'styled-components';
import { BookmarkDataLoader } from './dataLoader/DataLoader';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function BookmarkWidget() {
  return (
    <StyledBookmarksRoot>
      <QueryClientProvider client={queryClient}>
        <BookmarkDataLoader />
      </QueryClientProvider>
    </StyledBookmarksRoot>
  );
}

const StyledBookmarksRoot = styled.div`
  height: 100%;
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
`;
