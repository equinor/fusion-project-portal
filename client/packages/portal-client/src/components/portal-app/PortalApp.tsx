import PortalRouter from '../portal-router/PortalRouter';
import '@equinor/fusion-framework-module-event';
import { useAppModule } from '@equinor/fusion-framework-react-app';
import { useEffect, useState } from 'react';
import { useObservable } from '@equinor/portal-utils';
import { framework$ } from '@equinor/portal-core';

export function PortalApp() {
  const framework = useObservable(framework$);
  if (!framework) return <div></div>;
  return <PortalRouter />;
}

export default PortalApp;
