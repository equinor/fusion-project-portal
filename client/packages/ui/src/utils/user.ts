import { AccountColor } from '@portal/types';

/**
 * Get the color associated with a specific account type.
 *
 * @param {string | undefined} accountType - The account type for which to retrieve the color.
 * @returns {string} - The color code associated with the provided account type.
 *
 * @example
 * const color = getAccountTypeColor('Employee');
 * // Returns: '#8c1159'
 *
 * @example
 * const color = getAccountTypeColor('UnknownType');
 * // Returns the default color: '#ff92a8'
 */
export const getAccountTypeColor = (accountType?: string | null) => {
	switch (accountType) {
		case 'Employee':
			return AccountColor.Employee;
		case 'Consultant':
			return AccountColor.Consultant;
		case 'Enterprise':
			return AccountColor.Enterprise;
		case 'External':
			return AccountColor.External;
		case 'External Hire':
			return AccountColor.ExternalHire;
		default:
			return AccountColor.Default;
	}
};
