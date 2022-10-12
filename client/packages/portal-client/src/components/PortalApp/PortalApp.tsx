import {
  useCurrentUser,
  useFramework,
} from '@equinor/fusion-framework-react/hooks';
import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';

import styled from 'styled-components';
import Header from '../Header/Header';

export function PortalApp() {
  return (
    <StyleProvider>
      <MenuProvider>
        <Header />
        <PortalMenu>Portal Menu</PortalMenu>
        <Component />
      </MenuProvider>
    </StyleProvider>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
`;

function Component() {
  const framework = useFramework();
  const account = useCurrentUser();

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default PortalApp;
