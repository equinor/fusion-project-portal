import { render, screen, fireEvent } from '@testing-library/react';
import { MyRolesTab } from './MyRolesTab';
import { it, describe, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Role } from '@portal/types';

const role1: Role = {
	name: 'Role1',
	displayName: 'Role 1',
	isActive: true,
	activeToUtc: '2023-12-31T23:59:59Z',
	onDemandSupport: true,
	sourceSystem: 'fusion',
	type: 'global',
	scope: {
		type: 'test',
	},
};

describe('MyRolesTab', () => {
	vi.mock('./hooks/use-update-my-roles-query.ts', () => ({
		useUpdateMyRoles: vi.fn((roles) => ({
			roles,
		})),
	}));

	it('renders My Roles tab with roles', async () => {
		const roles = [role1];

		render(
			<MyRolesTab
				onClick={() => {
					//
				}}
				userRoles={roles}
			/>
		);

		const titleElement = screen.getByText('My Roles');
		expect(titleElement).toBeInTheDocument();

		const roleElement = screen.getByText('Role 1');
		expect(roleElement).toBeInTheDocument();

		const switchElement = screen.getByRole('checkbox');
		expect(switchElement).toBeInTheDocument();
	});

	it('renders My Roles tab with no roles', () => {
		const roles: Role[] = [];

		render(
			<MyRolesTab
				onClick={() => {
					//
				}}
				userRoles={roles}
			/>
		);

		const titleElement = screen.getByText('My Roles');
		expect(titleElement).toBeInTheDocument();

		const noRolesMessage = screen.getByText('You have no roles assigned');
		expect(noRolesMessage).toBeInTheDocument();
	});

	it('calls the onClick function when the back button is clicked', () => {
		const onClickMock = vi.fn();
		render(<MyRolesTab onClick={onClickMock} />);

		const backButton = screen.getByRole('button', { name: 'Back' });
		fireEvent.click(backButton);

		expect(onClickMock).toHaveBeenCalled();
	});
});
