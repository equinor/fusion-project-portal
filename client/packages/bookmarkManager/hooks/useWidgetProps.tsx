import React, { createContext, useContext } from 'react';
import { BookmarkWidgetProps } from '../components';

const PropsContext = createContext<BookmarkWidgetProps | null>(null);
export const PropsProvider = (
  props: Parameters<typeof PropsContext.Provider>[0]
) => <PropsContext.Provider {...props} />;

export const useWidgetProps = (): BookmarkWidgetProps => {
  const context = useContext(PropsContext);
  if (!context) throw new Error('');
  return context;
};
