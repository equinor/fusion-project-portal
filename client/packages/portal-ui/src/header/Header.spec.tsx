import { Button } from '@equinor/eds-core-react';
import { render } from '@testing-library/react';

import Header from './Header';
import React from 'react';

describe('PortalTopBar', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<Header
				MenuButton={() => <Button>Button</Button>}
				onLogoClick={() => {
					//
				}}
			/>
		);
		expect(baseElement).toBeTruthy();
	});
});
