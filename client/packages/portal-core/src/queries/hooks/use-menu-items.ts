import { useCurrentView } from './use-current-view';

export const useMenuItems = () => {
  const view = useCurrentView();
  return {
    ...view,
    data: view.data ? view.data.appGroups : [],
  };
};
