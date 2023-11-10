import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExternalLink } from './ExternalLink'; // Update the import path accordingly

describe('ExternalLink Component', () => {
	const testProps = {
		href: 'https://www.example.com',
		title: 'External Link Example',
		text: 'Visit Example',
		icon: '🔗',
	};

	it('renders as an anchor tag with correct attributes', () => {
		render(<ExternalLink {...testProps} />);
		const linkElement = screen.getByRole('link');

		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute('href', testProps.href);
		expect(linkElement).toHaveAttribute('target', '_blank');
		expect(linkElement).toHaveAttribute('title', testProps.title);
	});

	it('displays link text and icon', () => {
		render(<ExternalLink {...testProps} />);
		const linkText = screen.getByText(testProps.text);
		const linkIcon = screen.getByText(testProps.icon);

		expect(linkText).toBeInTheDocument();
		expect(linkIcon).toBeInTheDocument();
	});

	it('renders with the correct link icon', () => {
		render(<ExternalLink {...testProps} />);
		const externalLinkIcon = screen.getByText('🔗');

		expect(externalLinkIcon).toBeDefined();
		expect(externalLinkIcon).toContainHTML('🔗');
	});
});
