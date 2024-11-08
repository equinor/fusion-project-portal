import { render, screen, fireEvent } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import { MyAllocationTab } from './MyAllocationTab';
import { PersonPosition, PortalConfig } from '@portal/types';
import '@testing-library/jest-dom';
import { getFusionPortalURL } from '@portal/utils';

const currentDate = new Date();

// Add 100 days to the current date
const appliesTo = new Date(currentDate.getTime() + 100 * 24 * 60 * 60 * 1000);

const position1: PersonPosition = {
	positionId: '1a97ae07',
	positionExternalId: '0000',
	id: 'e6837ff2',
	parentPositionId: 'c5b2ab3b',
	taskOwnerIds: [],
	name: 'IT Software developer',
	obs: '',
	basePosition: {
		id: 'bae824d2',
		name: 'IT Software developer ',
		type: 'TDI',
		discipline: 'Information Technology',
	},
	project: {
		id: '4cd6313d-ebeb-47e1-bdf4-51e427795e3a',
		name: 'Fusion Test Project',
		domainId: '0000',
		type: 'PRD',
	},
	isTaskOwner: false,
	appliesFrom: new Date('2023-08-30T00:00:00'),
	appliesTo,
	workload: 50,
};

window._config_ = { fusionLegacyEnvIdentifier: 'CI' } as PortalConfig;

describe('MyAllocationTab', () => {
	it('renders My Position tab with positions', async () => {
		const positions = [position1];

		render(
			<MyAllocationTab
				onClick={() => {
					//
				}}
				positions={positions}
			/>
		);

		const titleElement = screen.getByText('My Allocation');
		expect(titleElement).toBeInTheDocument();

		const roleElement = screen.getByText('IT Software developer');
		expect(roleElement).toBeInTheDocument();
	});

	it('rendersMy Position tab with no positions', () => {
		const positions: PersonPosition[] = [];

		render(
			<MyAllocationTab
				onClick={() => {
					//
				}}
				positions={positions}
			/>
		);

		const titleElement = screen.getByText('My Allocation');
		expect(titleElement).toBeInTheDocument();

		const noRolesMessage = screen.getByText('You have no allocations');
		expect(noRolesMessage).toBeInTheDocument();
	});

	it('calls the onClick function when the back button is clicked', () => {
		const onClickMock = vi.fn();
		render(<MyAllocationTab onClick={onClickMock} />);

		const backButton = screen.getByRole('button', { name: 'Back' });
		fireEvent.click(backButton);

		expect(onClickMock).toHaveBeenCalled();
	});

	it('calls the the position and project link then links are clicked', () => {
		const positions = [position1];
		vi.mock('@portal/utils', (rest) => ({
			...rest,
			getFusionPortalURL: vi.fn(() => 'fusion.ci.fusion-dev.net'),
		}));

		render(
			<MyAllocationTab
				onClick={() => {
					//
				}}
				positions={positions}
			/>
		);

		// const projectLink = screen.getByRole('link', { name: position1.project.name });
		// fireEvent.click(projectLink);
		const positionLink = screen.getByRole('link', { name: position1.name });
		fireEvent.click(positionLink);

		expect(getFusionPortalURL).toHaveBeenCalled();
		expect(getFusionPortalURL).toBeCalledTimes(4);
	});
});
