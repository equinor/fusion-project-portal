import { tokens } from '@equinor/eds-tokens';

export const getAppCardColor = (app: {
	color?: string | null;
	isDisabled?: boolean;
	category?: { color?: string | null };
}) => {
	const appColor = app.isDisabled
		? tokens.colors.interactive.disabled__text.hex
		: app.category?.color || tokens.colors.interactive.primary__resting.hex;
	const appColors = {
		['--app-color' as PropertyKey]: appColor,
		['--app-color-skeleton' as PropertyKey]: appColor + '33',
	};
	return appColors;
};
