import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorViewer } from './ErrorView';

describe('error-view', () => {
	test('should show error page wit no cause', async () => {
		const error = new Error('Test Error');
		render(<ErrorViewer error={error} />);

		const elements = screen.getAllByText('Test Error');
		expect(elements.length).toBe(1);
	});
});
