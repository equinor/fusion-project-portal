import FusionSkeleton, { SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import { CSSProperties, FC } from 'react';

type SkeletonProps = {
	width?: number | string;
	size?: keyof typeof skeletonSize;
	variant?: keyof typeof skeletonVariant;
	fluid?: boolean;
};

const skeletonVariant = {
	circle: SkeletonVariant.Circle,
	rectangle: SkeletonVariant.Rectangle,
	square: SkeletonVariant.Square,
	text: SkeletonVariant.Text,
};

const skeletonSize = {
	xSmall: SkeletonSize.XSmall,
	small: SkeletonSize.small,
	large: SkeletonSize.Large,
	medium: SkeletonSize.Medium,
};

/**
 * Skeleton Component
 *
 * The `Skeleton` component is a simplified ree-export of `@equinor/fusion-react-skeleton` a React component used to render skeleton loading elements.
 *
 * @param {number} width (optional) - Specifies the width of the skeleton element in present%
 * @param {string} type (optional) - Specifies the type of skeleton to render. Should be one of "xSmall" | "small" | "large" | "medium"  default is xSmall.
 * @param {string} variant (optional) - Specifies the variant or shape of the skeleton. Should be one of "circle" | "rectangle" | "square" | "text", default is text.
 * @param {boolean} fluid (optional) - Expands the skeleton element width to the width of the parent
 *
 * @returns {JSX.Element} - A skeleton loading element with the specified type, variant, and width (if provided).
 */
export const Skeleton: FC<SkeletonProps & { style?: CSSProperties }> = ({ width, size, variant, style, fluid }) => {
	return (
		<FusionSkeleton
			size={size ? skeletonSize[size] : skeletonSize.xSmall}
			variant={variant ? skeletonVariant[variant] : skeletonVariant.text}
			style={{ ...style, ...(width && { width: typeof width === 'number' ? `${width}%` : width }) }}
			fluid={fluid}
		/>
	);
};
