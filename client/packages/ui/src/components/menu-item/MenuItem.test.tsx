import { describe, it, vi, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import MenuItem from './MenuItem';
import { home } from '@equinor/eds-icons';
import { Menu } from '@equinor/eds-core-react';

describe('MenuItem component', () => {
	it('renders the menu item with a title and icon', () => {
		const { getByText, getByTestId, getByTitle } = render(
			<Menu open>
				<MenuItem title="Test Item" iconData={home}>
					Test Content
				</MenuItem>
			</Menu>
		);

		const titleElement = getByTitle('Test Item');
		const contentElement = getByText('Test Content');
		const iconElement = getByTestId('menu-icon');

		expect(titleElement).toBeInTheDocument();
		expect(contentElement).toBeInTheDocument();
		expect(iconElement).toBeInTheDocument();
		expect(titleElement.title).toBe('Test Item');
	});

	it('calls the onClick function when clicked', () => {
		const onClickMock = vi.fn();
		const { getByTitle } = render(
			<Menu open>
				<MenuItem title="Test Item" iconData={home} onClick={onClickMock}>
					Test Content
				</MenuItem>
			</Menu>
		);

		const titleElement = getByTitle('Test Item');

		fireEvent.click(titleElement);

		expect(onClickMock).toHaveBeenCalled();
	});

	it('renders a link when the "link" prop is provided', () => {
		const { getByRole } = render(
			<Menu open>
				<MenuItem title="Test Item" iconData={home} link="https://example.com">
					Test Content
				</MenuItem>
			</Menu>
		);

		const linkElement = getByRole('link');

		expect(linkElement).toHaveAttribute('href', 'https://example.com');
		expect(linkElement).toHaveAttribute('target', '_blank');
	});
});
