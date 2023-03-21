import { HandoverPackage, KPI, KPIStatus } from './types';

export const getStatusBarData = (data?: HandoverPackage[]): Record<KPI, number> => {
	if (!data) {
		return {
			'RFOC Accepted': 0,
			'RFOC Partly': 0,
			'RFOC Sent': 0,
			OS: 0,
			overdue: 0,
			targetSum: 0,
		} as Record<KPI, number>;
	}
	return data.reduce(
		(acc, curr) => {
			/** status */
			const pkgStatus = getKPIStatus(curr);
			acc[pkgStatus] = acc[pkgStatus] + 1;

			/** overdue */
			if (
				curr.rfocActualDate === '' &&
				curr.rfocPlannedDate !== '' &&
				new Date(curr.rfocPlannedDate).getTime() < new Date().getTime()
			) {
				acc.overdue = acc.overdue + 1;
			}

			/** rfo vs target */
			if (curr.rfocPlannedDate !== '' && new Date(curr.rfocPlannedDate).getTime() <= new Date().getTime()) {
				acc.targetSum = acc.targetSum + 1;
			}

			return acc;
		},
		{
			'RFOC Accepted': 0,
			'RFOC Partly': 0,
			'RFOC Sent': 0,
			OS: 0,
			overdue: 0,
			targetSum: 0,
		} as Record<KPI, number>
	);
};

export const getKPIStatus = (pkg: HandoverPackage): KPIStatus => {
	if (pkg.mcPkgsRFOCSigned > 0 && pkg.mcPkgsCount > 0 && pkg.mcPkgsRFOCSigned === pkg.mcPkgsCount) {
		return 'RFOC Accepted';
	}
	if (pkg.mcPkgsRFOCShipped > 0 && pkg.mcPkgsCount > 0 && pkg.mcPkgsRFOCShipped === pkg.mcPkgsCount) {
		return 'RFOC Sent';
	}
	if (pkg.mcPkgsRFOCSigned > 0) {
		return 'RFOC Partly';
	}
	return 'OS';
};

export function numberFormat(number: number): string {
	return parseFloat(Math.round(number).toString()).toLocaleString('no');
}
