import { render } from '@testing-library/react';
import PortalApp from './PortalApp';

describe('PortalApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortalApp />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a fusion as the title', () => {
    const { getByText } = render(<PortalApp />);

    expect(getByText(/fusion/gi)).toBeTruthy();
  });
});
