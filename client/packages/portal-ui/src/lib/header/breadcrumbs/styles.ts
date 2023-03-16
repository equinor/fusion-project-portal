import { Breadcrumbs as EdsBreadcrumbs, Menu } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledBreadcrumbs = styled(EdsBreadcrumbs)`
	> ol {
		align-items: center;
		flex-wrap: nowrap;
	}
`;

export const StyledBreadcrumbItem = styled.span`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: max-content;
`;

export const StyledMenuItem = styled(Link)`
	min-width: 280px;
	> button {
		width: 100%;
	}
`;
