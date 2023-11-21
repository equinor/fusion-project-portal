import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';

import { more_vertical, settings } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import { NotificationsSettings } from './NotificationsSettings';

export const NotificationMenu = () => {
	const ref = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	return (
		<div>
			<Button variant="ghost_icon" ref={ref} onClick={() => setIsOpen((s) => !s)}>
				<Icon data={more_vertical} />
			</Button>
			<Menu open={isOpen} anchorEl={ref.current}>
				<Menu.Item
					onClick={() => {
						setIsSettingsOpen(true);
						setIsOpen(false);
					}}
				>
					<Icon data={settings} size={16} color={tokens.colors.text.static_icons__tertiary.hex} />
					<Typography group="navigation" variant="menu_title" as="span">
						Settings
					</Typography>
				</Menu.Item>
			</Menu>
			<NotificationsSettings
				isOpen={isSettingsOpen}
				onClose={() => {
					setIsSettingsOpen(false);
				}}
			/>
		</div>
	);
};
