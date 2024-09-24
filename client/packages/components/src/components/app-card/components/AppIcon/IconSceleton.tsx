import styled, { css } from 'styled-components';
import { Skeleton } from '@equinor/fusion-react-skeleton';
import { tokens } from '@equinor/eds-tokens';

import { AppCardType } from '../../types/types';

export const primaryColor = tokens.colors.interactive.primary__resting.hex;

export const IconSkeleton = styled(Skeleton as any)`
	--fwc-skeleton-fill-color: var(--app-color-skeleton, ${primaryColor}33);
`;

export const AppIconSkeleton = styled(IconSkeleton)<{ $display: AppCardType }>`
	--fwc-skeleton-fill-color: var(--app-color-skeleton, ${primaryColor}33);
	${({ $display }) => {
		switch ($display) {
			default:
			case 'card':
				return css`
					margin: 1.313rem 0.625rem;
				`;
			case 'portal':
				return css`
					margin: 1.625rem 1.25rem;
				`;
		}
	}}
`;
