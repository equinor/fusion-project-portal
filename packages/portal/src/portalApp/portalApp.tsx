import {
  useCurrentUser,
  useFramework,
} from '@equinor/fusion-framework-react/hooks';
import { PortalTopBar, StyleProvider } from '@fusion-pe-portal/portal-ui';

export function PortalApp() {
  return (
    <StyleProvider>
      <PortalTopBar />
      <Component />
    </StyleProvider>
  );
}

function Component() {
  const framework = useFramework();

  const account = useCurrentUser();

  return (
    <div>
      <h3>Current user</h3>
      <code>
        <pre>{JSON.stringify(account, null, 4)}</pre>
      </code>
      <h3>Registered modules in Framework</h3>
      <ul>
        {Object.keys(framework.modules).map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

export default PortalApp;
