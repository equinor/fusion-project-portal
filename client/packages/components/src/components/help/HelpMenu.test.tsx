import { render } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import HelpMenu from './HelpMenu';

const setActiveActionById = vi.fn();

describe('HelpMenu', () => {
	it('should be defined', () => {
		const { getAllByTestId } = render(<HelpMenu setActiveActionById={setActiveActionById} />);
		const items = getAllByTestId('menu-item-button');

		expect(items).toBeDefined();
	});
});
