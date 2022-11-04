import { useCurrentView } from './useCurrentView';

export const useMenuItems = () => {
  const view = useCurrentView();
  return {
    ...view,
    data: view.data ? view.data.appGroups : [],
  };
};
