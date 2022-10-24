import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';
import { phases } from 'packages/portal-core/src/mock.ts/phases';
import { Phase } from '../phase/Phase';
import { useQuery } from 'react-query';
import Header from '../portal-header/Header';
import { useEffect } from 'react';
import { storage } from '@equinor/portal-utils';
import { phaseStorage, setActivePhase } from '../../utils/phases/phases';
import { Phase as IPhase } from '@equinor/portal-core';

export function PortalApp() {
  return (
    <StyleProvider>
      <MenuProvider>
        <Header />
        <PortalMenu>Portal Menu</PortalMenu>
        <Phase />
      </MenuProvider>
    </StyleProvider>
  );
}

export default PortalApp;

export function useInitPhase() {
  useQuery<IPhase[]>(['phases', () => Promise.resolve(phases)], {
    onSuccess: (data) => {
      const id = phaseStorage.readPhase();
      const phase = data.find((s) => s.id === id);
      if (!phase) return;
      setActivePhase(phase);
    },
  });
}
