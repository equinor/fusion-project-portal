import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';
import { useNotificationCenter } from '../hooks/useNotificationCenter';
import { useNotification } from '../hooks/useNotification';
import { delete_to_trash, more_vertical, visibility } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import { tokens } from '@equinor/eds-tokens';

export const NotificationActions = () => {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	const { onNotification, markAsRead, deleteNotification } = useNotification();
	const { unreadNotificationCards, readNotificationCards } = useNotificationCenter(onNotification);

	const clickMarkAllAsRead = () => {
		unreadNotificationCards.map((notification) => markAsRead(notification?.id));
	};
	const clickDeleteAllDismissed = () => {
		readNotificationCards.map((notification) => deleteNotification(notification?.id));
	};
	return (
		<div>
			<Button ref={ref} variant="ghost_icon" onClick={() => setOpen((s) => !s)}>
				<Icon data={more_vertical} />
			</Button>
			<Menu open={open} anchorEl={ref.current} onMouseLeave={() => setOpen(false)}>
				<Menu.Item onClick={clickMarkAllAsRead} disabled={unreadNotificationCards.length === 0}>
					<Icon data={visibility} size={16} color={tokens.colors.text.static_icons__tertiary.hex} />
					<Typography group="navigation" variant="menu_title" as="span">
						Mark all as read
					</Typography>
				</Menu.Item>
				<Menu.Item onClick={clickDeleteAllDismissed} disabled={readNotificationCards.length === 0}>
					<Icon data={delete_to_trash} size={16} color={tokens.colors.text.static_icons__tertiary.hex} />{' '}
					<Typography group="navigation" variant="menu_title" as="span">
						Delete all dismissed
					</Typography>
				</Menu.Item>
			</Menu>
		</div>
	);
};
