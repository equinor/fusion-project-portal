import styled, { css } from 'styled-components';
import { Skeleton, HTMLSkeletonCustomElement } from '@equinor/fusion-react-skeleton';
import { WebComponent } from '@equinor/fusion-react-utils';
import { tokens } from '@equinor/eds-tokens';

import { AppCardType } from '../../types/types';

export const primaryColor = tokens.colors.interactive.primary__resting.hex;

type ElementProps = React.PropsWithChildren<
	Partial<Pick<HTMLSkeletonCustomElement, 'size' | 'variant' | 'inactive' | 'fluid'>>
>;

export const AppIconSkeleton = styled(Skeleton as WebComponent<HTMLSkeletonCustomElement, ElementProps>)<{
	$display: AppCardType;
}>`
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
