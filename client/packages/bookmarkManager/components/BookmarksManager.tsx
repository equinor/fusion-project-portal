import { Icon } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_right,
  share,
  more_vertical,
} from '@equinor/eds-icons';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PropsProvider } from '../hooks/useWidgetProps';

Icon.add({
  chevron_down,
  chevron_right,
  share,
  more_vertical,
});

import styled from 'styled-components';
import { BookmarkDataLoader } from './dataLoader/DataLoader';

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
  height: 100%;
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
`;
