import { render } from '@testing-library/react';

import PortalTopBar from './topBar';

describe('PortalTopBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortalTopBar />);
    expect(baseElement).toBeTruthy();
  });
});
