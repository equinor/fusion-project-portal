import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar component', () => {
	test('renders an avatar with a given URL', () => {
		const imageUrl = 'https://example.com/avatar.png';

		const { getByTestId } = render(<Avatar url={imageUrl} width={100} height={100} borderColor="#000000" />);

		const avatarElement = getByTestId('avatar-icon');
		expect(avatarElement).toBeInTheDocument();
		expect(avatarElement).toHaveStyle(`background-image: url(${imageUrl})`);
	});

	test('renders a default avatar when URL is not provided', () => {
		const { getByTestId } = render(<Avatar />);

		const avatarElement = getByTestId('avatar-icon');
		expect(avatarElement).toBeInTheDocument();
		expect(avatarElement).toHaveAttribute('aria-label', 'User Avatar');
	});

	test('applies the specified border color', () => {
		const imageUrl = 'https://example.com/avatar.png';
		const borderColor = '#FF0000';

		const { getByTestId } = render(<Avatar url={imageUrl} width={100} height={100} borderColor={borderColor} />);

		const avatarElement = getByTestId('avatar-icon');
		expect(avatarElement).toHaveStyle(`border: 3px solid ${borderColor}`);
	});

	test('applies the specified width and height', () => {
		const imageUrl = 'https://example.com/avatar.png';
		const width = 150;
		const height = 150;

		const { getByTestId } = render(<Avatar url={imageUrl} width={width} height={height} />);

		const avatarElement = getByTestId('avatar-icon');
		expect(avatarElement).toHaveStyle(`width: ${width}px`);
		expect(avatarElement).toHaveStyle(`height: ${height}px`);
	});
});
