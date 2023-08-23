import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorViewer } from './ErrorView';
import ReactRouterDom from 'react-router-dom';
import { Icon } from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';

vi.mock('react-router-dom', async (reactRouterDom) => {
	const rest = (await reactRouterDom()) as typeof ReactRouterDom;
	return {
		...rest,
		useRouteError: () => {
			return new Error('Some Error');
		},
	};
});

Icon.add({ error_outlined });

describe('error-view', () => {
	test('should show error page wit no cause', async () => {
		const error = new Error('Test Error');
		render(<ErrorViewer error={error} />);

		const elements = screen.getAllByText('Error - Test Error');
		expect(elements.length).toBe(1);
		const subElements = screen.getAllByText('Some Error');
		expect(subElements.length).toBe(1);
	});
});
