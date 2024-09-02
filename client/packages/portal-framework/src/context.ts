import { createContext } from 'react';
import type { Fusion } from '@equinor/fusion-framework';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const context = createContext<Fusion<any> | null>(null);

/**
 * Component for providing framework.
 *
 * @remarks
 * Should be created by {@link createFrameworkProvider}
 *
 * @example
 * ```tsx
 * import {PortalFrameworkProvider} from '@equinor/fusion-portal-framework-react';
 * export const Component = (args: React.PropsWithChildren<{framework: Fusion}>) => {
 *   return (
 *      <PortalFrameworkProvider value={args.framework}>
 *        {args.children}
 *      </PortalFrameworkProvider>
 *   );
 * }
 * ```
 */
export const PortalFrameworkProvider = context.Provider;
