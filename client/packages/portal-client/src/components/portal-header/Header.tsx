import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import { Phase, TopBarAvatar, usePhases } from '@equinor/portal-core';
import { useQuery } from 'react-query';

export function Header() {
  const { phases, clearWorkSurface, currentWorkSurface, setWorkSurface } =
    usePhases();

  useMenuItems();

  return (
    <PortalHeader
      onLogoClick={() => {
        const phase = phases?.find(
          (s) => s.id === currentWorkSurface?.id
        )?.name;
        if (location.href.includes('/apps') && phase && currentWorkSurface) {
          setWorkSurface(currentWorkSurface);
        } else {
          clearWorkSurface();
        }
      }}
      MenuButton={MenuButton}
      title="Project Portal"
    >
      <TopBarAvatar />
    </PortalHeader>
  );
}

export default Header;

export const useMenuItems = () => {
  const id = usePhases().currentWorkSurface?.id;
  return useQuery(
    ['menu-items', id],
    async () => {
      if (id) {
        const res = await fetch(
          `https://app-pep-backend-noe-dev.azurewebsites.net/api/work-surfaces/${id}`
        );
        return ((await res.json()) as Phase).appGroups;
      } else {
        return [];
      }
    },
    { cacheTime: Infinity, refetchOnWindowFocus: false, staleTime: Infinity }
  );
};
