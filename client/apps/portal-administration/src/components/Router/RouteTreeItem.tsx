import { tokens } from '@equinor/eds-tokens';
import { Route } from '../../types/router-config';
import { RouteMenu } from './RouteMenu';
import { useRouterConfigContext } from '../../context/RouterContext';
import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { TreeItem } from '../Tree/TreeItem';

const Style = {
	Content: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		min-width: 150px;
		justify-content: flex-end;
	`,
	box: styled.div`
		min-width: 10px;
	`,
};

export const RouteTreeItem = ({ route, canEdit }: { route: Route; canEdit?: boolean }) => {
	const { activeRoute, setActiveRoute } = useRouterConfigContext();
	return (
		<TreeItem
			onClick={() => setActiveRoute(route.id)}
			selected={
				activeRoute?.id === route.id ? tokens.colors.interactive.primary__selected_highlight.hex : undefined
			}
			title={route.path}
			key={route.path}
			Render={() => {
				return (
					<Style.Content>
						<Typography variant="overline">- {route.pageKey}</Typography>
						{canEdit ? <RouteMenu route={route} /> : <Style.box></Style.box>}
					</Style.Content>
				);
			}}
		>
			{route.children?.map((childRoute) => (
				<RouteTreeItem route={childRoute} key={childRoute.path} canEdit={canEdit}></RouteTreeItem>
			))}
		</TreeItem>
	);
};
