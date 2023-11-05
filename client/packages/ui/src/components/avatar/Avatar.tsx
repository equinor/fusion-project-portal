import { Icon } from '@equinor/eds-core-react';
import { account_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const Styles = {
	photo: styled.div<{ height?: number; width?: number; borderColor?: `#${string}` }>`
		height: ${({ height }) => (height ? `${height}px` : '32px')};
		width: ${({ width }) => (width ? `${width}px` : '32px')};
		overflow: hidden;
		border-radius: 50%;
		flex-shrink: 0;
		position: relative;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		border: ${({ borderColor }) => (borderColor ? `3px solid ${borderColor}` : '2px solid none')};
	`,
};
``;
type AvatarProps = {
	url?: string;
	borderColor?: `#${string}`;
	height?: number;
	width?: number;
};

export const Avatar = ({ url, width, height, borderColor }: AvatarProps): JSX.Element | null => {
	if (!url) {
		return (
			<Icon
				color={tokens.colors.interactive.primary__resting.hex}
				data={account_circle}
				data-testid="avatar-icon"
				aria-label="User Avatar"
			/>
		);
	}

	return (
		<Styles.photo
			role="img"
			aria-label="User Avatar"
			data-testid="avatar-icon"
			tabIndex={0}
			style={{ backgroundImage: `url(${url})` }}
			width={width}
			height={height}
			borderColor={borderColor}
		/>
	);
};

export default Avatar;
