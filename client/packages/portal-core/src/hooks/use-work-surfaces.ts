import { useHttpClient } from '@equinor/fusion-framework-react/hooks';
import { useQuery } from 'react-query';
import { WorkSurface } from '../types/portal-config';

export const useWorkSurfaces = () => {
  const client = useHttpClient('portal');

  return useQuery<WorkSurface[]>(['work-surfaces'], async () => {
    const res = await client.fetch(
      'https://app-pep-backend-noe-dev.azurewebsites.net/api/work-surfaces'
    );
    if (!res.ok) {
      throw res;
    }
    return await res.json();
  });
};
