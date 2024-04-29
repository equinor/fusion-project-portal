import { Breadcrumbs as EdsBreadcrumbs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledBreadcrumbs = styled(EdsBreadcrumbs)`
	> ol {
		align-items: center;
		flex-wrap: nowrap;
		> li {
			min-width: 0px;
		}
	}
`;

export const StyledBreadcrumbItem = styled.span`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: max-content;
	min-width: 0px;
`;
export const StyledBreadcrumbItemInteract = styled(StyledBreadcrumbItem)`
	cursor: pointer;
	display: flex;
	align-items: center;

	:hover {
		color: ${tokens.colors.interactive.primary__hover.hex};
	}
`;
