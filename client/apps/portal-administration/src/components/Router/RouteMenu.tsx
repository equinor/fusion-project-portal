import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';

import { useState } from 'react';

import { add, edit, more_vertical, remove_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Route } from '../../types/router-config';
import { useRouterConfigContext } from '../../context/RouterContext';

export const RouteMenu = ({ route }: { route: Route }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const { createNewRoute, removeRouteById, setActiveRoute } = useRouterConfigContext();

	const openMenu = () => {
		setIsOpen(true);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<Button
				ref={setAnchorEl}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					openMenu();
				}}
				variant="ghost_icon"
			>
				<Icon data={more_vertical} />
			</Button>

			<Menu open={isOpen} onClose={closeMenu} anchorEl={anchorEl}>
				<Menu.Item
					onClick={() => {
						console.log(route);
						setActiveRoute(route.id);
					}}
				>
					<Icon data={edit} size={16} color={tokens.colors.text.static_icons__tertiary.hex} />
					<Typography group="navigation" variant="menu_title" as="span">
						Edit
					</Typography>
				</Menu.Item>
				<Menu.Item
					onClick={() => {
						createNewRoute(route.id);
					}}
				>
					<Icon data={add} size={16} color={tokens.colors.text.static_icons__tertiary.hex} />
					<Typography group="navigation" variant="menu_title" as="span">
						Add
					</Typography>
				</Menu.Item>
				<Menu.Item
					onClick={() => {
						removeRouteById(route.id);
					}}
				>
					<Icon data={remove_outlined} size={16} color={tokens.colors.text.static_icons__tertiary.hex} />
					<Typography group="navigation" variant="menu_title" as="span">
						Remove
					</Typography>
				</Menu.Item>
			</Menu>
		</div>
	);
};
