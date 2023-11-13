import { Icon, Menu, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren } from 'react';

import styled from 'styled-components';

interface MenuItemProps {
	title: string;
	onClick?: VoidFunction;
	icon?: string;
	iconData?: IconData;
	link?: string;
}
const StyledMenuItem = styled(Menu.Item)`
	min-width: 280px;
	padding: 0px;
	padding-left: 24px;
	padding-right: 8px;
	height: 48px;
`;

export function MenuItem({ icon, title, onClick, children, link, iconData }: PropsWithChildren<MenuItemProps>) {
	if (icon && iconData) throw new Error('No icon is added please add icon or icon data form eds');

	if (link) {
		return (
			<a href={link} target="_blank" role="link" title={title}>
				<StyledMenuItem>
					<Icon
						data-testid="menu-icon"
						data={iconData}
						name={icon}
						size={16}
						color={tokens.colors.text.static_icons__tertiary.hex}
					/>
					<Typography group="navigation" variant="menu_title" as="span">
						{children}
					</Typography>
				</StyledMenuItem>
			</a>
		);
	}
	return (
		<StyledMenuItem
			data-testid="menu-item-button"
			onClick={() => {
				onClick && onClick();
			}}
			title={title}
		>
			<Icon
				data-testid="menu-icon"
				data={iconData}
				name={icon}
				size={16}
				color={tokens.colors.text.static_icons__tertiary.hex}
			/>
			<Typography group="navigation" variant="menu_title" as="span">
				{children}
			</Typography>
		</StyledMenuItem>
	);
}
export default MenuItem;
