import { GridOptions } from '@equinor/workspace-ag-grid';
import { defaultColDef } from './defaultColDef';

export const defaultGridOptions: GridOptions = {
	defaultColDef: defaultColDef,
	serverSideInitialRowCount: 100,
	enableBrowserTooltips: true,
	enableCellTextSelection: true,
	ensureDomOrder: true,
	onFirstDataRendered: (event) => {
		const api = event.api;
		api.sizeColumnsToFit();
	},
	suppressColumnVirtualisation: true,
	autoSizePadding: 10,
	rowHeight: 36,
};

export const bottomPadding = 70;

export function capitalizeFirstLetter(str?: string) {
	if (!str) return ''; // Handle empty string
	return str.charAt(0).toUpperCase() + str.slice(1);
}
