import { css } from '@emotion/css';
import { tokens } from '@equinor/eds-tokens';

export const styles = {
	appsWrapper: (count: number) => css`
		padding: 0 0 1rem 1rem;
		display: block;
		grid-template-columns: auto;
		padding-bottom: 2rem;
		column-width: auto;
		gap: 2rem;
		column-count: ${count};
	`,
	menuItem: css`
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		height: 24px;
	`,
	groupWrapper: css`
		display: flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		width: inherit;
	`,
	groupName: (isActive: boolean) => css`
		font-weight: ${isActive ? 700 : 500};
		line-height: 16px;
		margin: 0;
		height: 24px;
		font-size: 14px;
		margin-bottom: 1rem;
		color: ${tokens.colors.text.static_icons__default.hex};
		margin-block-start: 0;
		margin-block-end: 1rem;
	`,
	groupBody: css`
		display: flex;
		flex-direction: column;
		width: inherit;
	`,
	group: css`
		display: flex;
		gap: 0.5em;
		min-width: 300px;
		width: 100%;
		align-items: flex-start;
		break-inside: avoid;
		margin-bottom: 2rem;
	`,
	list: css`
		display: flex;
		flex-direction: column;
		list-style-type: none;
		margin-block-start: 0;
		margin-block-end: 0;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		padding-inline-start: 0;
		gap: 1rem;
	`,
	categoryItem: (isActive: boolean) => css`
		background: none;
		border: none;
		width: 300px;
		font-weight: ${isActive ? 700 : 400};
		display: flex;
		align-items: center;
		color: ${isActive
			? tokens.colors.interactive.primary__resting.hex
			: tokens.colors.text.static_icons__default.hex};
		flex: none;
		flex-grow: 0;
		height: 24px;
		line-height: 16px;
		cursor: pointer;
	`,
};
