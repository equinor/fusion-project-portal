/**
 * Calculates the time remaining until a specified date and returns a human-readable string.
 *
 * @param activeTo - A string representing the target expiration date in a valid date format.
 * @returns A string indicating the remaining time until the specified date.
 */
export const expiresIn = (activeTo: string) => {
	const activeToDate = new Date(activeTo).getTime();
	const now = new Date().getTime();

	if (isNaN(activeToDate) || now > activeToDate) {
		return 'Expired';
	}

	const millisecondsInAnHour = 36e5;

	return `Expires in ${Math.ceil(Math.abs(activeToDate - now) / millisecondsInAnHour)} hours`;
};
