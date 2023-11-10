import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MessageCard, Variant } from './MessageCard';

describe('MessageCard', () => {
	it('renders an Info message card', () => {
		const title = 'Info Title';
		const messages = [{ message: 'Info Message 1' }, { message: 'Info Message 2' }];
		const type: Variant = 'Info';

		render(<MessageCard title={title} messages={messages} type={type} />);

		const card = screen.getByRole('banner');
		const titleElement = screen.getByText(title);
		const infoIcon = screen.getByTitle('Icon');

		expect(card).toBeInTheDocument();
		expect(titleElement).toBeInTheDocument();
		expect(infoIcon).toBeInTheDocument();
		messages.forEach((message) => {
			const messageElement = screen.getByText(message.message);
			expect(messageElement).toBeInTheDocument();
		});
	});

	it('renders a Warning message card', () => {
		const title = 'Warning Title';
		const messages = [{ message: 'Warning Message 1' }, { message: 'Warning Message 2' }];
		const type: Variant = 'Warning';

		render(<MessageCard title={title} messages={messages} type={type} />);

		const card = screen.getByRole('banner');
		const titleElement = screen.getByText(title);
		const warningIcon = screen.getByTitle('Icon');

		expect(card).toBeInTheDocument();
		expect(titleElement).toBeInTheDocument();
		expect(warningIcon).toBeInTheDocument();
		messages.forEach((message) => {
			const messageElement = screen.getByText(message.message);
			expect(messageElement).toBeInTheDocument();
		});
	});

	it('renders an Error message card', () => {
		const title = 'Error Title';
		const messages = [{ message: 'Error Message 1' }, { message: 'Error Message 2' }];
		const type: Variant = 'Error';

		render(<MessageCard title={title} messages={messages} type={type} />);

		const card = screen.getByRole('banner');
		const titleElement = screen.getByText(title);
		const errorIcon = screen.getByTitle('Icon');

		expect(card).toBeInTheDocument();
		expect(titleElement).toBeInTheDocument();
		expect(errorIcon).toBeInTheDocument();
		messages.forEach((message) => {
			const messageElement = screen.getByText(message.message);
			expect(messageElement).toBeInTheDocument();
		});
	});
});
