import { Button } from '@equinor/eds-core-react';
import { render } from '@testing-library/react';

import Header from './Header';

describe('PortalTopBar', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Header MenuButton={() => <Button>Button</Button>} title="test" />);
		expect(baseElement).toBeTruthy();
	});
});
