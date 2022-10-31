import { Button } from '@equinor/eds-core-react';
import { render } from '@testing-library/react';

import PortalHeader from './PortalHeader';

describe('PortalTopBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PortalHeader MenuButton={() => <Button>Button</Button>} title="test" />
    );
    expect(baseElement).toBeTruthy();
  });
});
