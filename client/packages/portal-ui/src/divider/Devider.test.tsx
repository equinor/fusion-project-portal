import React from 'react';

import { act, render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
	test('Mounts correctly', () => {
		act(() => {
			render(<Divider id="test" />);
		});

		const el = document.getElementById('test');
		expect(el).toBeTruthy();
	});
});
