import { useHttpClient } from '@equinor/fusion-framework-react/hooks';

export const usePortalClient = () => useHttpClient('portal-client' as 'portal');
