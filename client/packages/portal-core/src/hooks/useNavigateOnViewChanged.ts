import { appMounted } from '@equinor/portal-utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Observable } from 'rxjs';
import { useViews } from '../queries';
import { View } from '../types/view';

export const useNavigateOnViewChanged = (
  obs$: Observable<string | undefined>
) => {
  const navigate = useNavigate();
  const { data, refetch } = useViews();

  useEffect(() => {
    const sub = obs$.subscribe((viewId) => {
      /** User is inside an app, dont navigate anywhere */
      if (appMounted()) return;
      /** ViewId is undefined, return to root if not already there */
      if (!viewId) {
        /** User is already at root */
        if (isRootUrl()) return;
        navigate('/');
        return;
      }
      /** ViewId changed an user is not already there */
      handleViewRedirect(
        //Either give a function that returns data or use the refetch function
        data ? () => Promise.resolve(data) : async () => (await refetch()).data,
        viewId,
        navigate
      );
    });
    return () => sub.unsubscribe();
  }, [data]);
};

async function handleViewRedirect(
  getData: () => Promise<View[] | undefined>,
  viewId: string,
  navigate: ReturnType<typeof useNavigate>
) {
  //Fetch data
  const data = await getData();
  if (!data) return;
  //Try to find view
  const view = data.find((s) => s.id === viewId)?.name;
  if (!view) return;
  //If user is already there, do nothing
  if (location.pathname.includes(view)) return;
  //User isnt there, navigate
  navigate(`/${view}`);
}

function isRootUrl() {
  return location.pathname.length === 0;
}
