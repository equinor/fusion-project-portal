import { css } from '@emotion/css';

const style = css`
	display: contents;
`;

export const createAppElement = () => {
	const element = document.createElement('div');

	element.className = style;
	return element;
};
