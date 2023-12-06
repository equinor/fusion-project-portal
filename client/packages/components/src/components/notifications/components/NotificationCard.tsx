import { Notification } from '../types/Notification';
import AdaptiveCardViewer from './adaptivCard/AdaptivCardViewer';
import { css } from '@emotion/css';
import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';
import { delete_to_trash, more_vertical, visibility } from '@equinor/eds-icons';

import { tokens } from '@equinor/eds-tokens';
import { useNotification } from '../hooks/useNotification';
import { useRef, useState } from 'react';

interface NotificationCardProps {
	notification: Notification;
	divisionLabel?: string;
	onNavigate?: () => void;
}
const styles = {
	notificationCard: css`
		border-radius: 4px;
		width: 100%;
		position: relative;
		border: 1px solid ${tokens.colors.ui.background__light.hex};
		box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
	`,
	notificationCardContent: css`
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		overflow: hidden;
	`,
	notificationActions: css`
		padding: 1rem;
	`,
	notificationDelete: css`
		position: absolute;
		right: 0;
		padding: 0.1rem;
	`,
};

const get24HTime = (date: string) => {
	const d = new Date(date);
	const min = d.getMinutes();
	return `${d.getHours()}:${min.toString().length === 1 ? '0' + min : min}`;
};

export const NotificationCard = ({ notification, divisionLabel }: NotificationCardProps): JSX.Element => {
	const { markAsRead, deleteNotification } = useNotification();
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	const clickMarkAsRead = (e?: React.MouseEvent) => {
		e?.preventDefault();
		e?.stopPropagation();
		markAsRead(notification?.id);
	};

	const clickDelete = (e?: React.MouseEvent) => {
		e?.preventDefault();
		e?.stopPropagation();
		deleteNotification(notification?.id);
	};

	return (
		<>
			{divisionLabel ? (
				<Typography variant="caption" token={{ textAlign: 'right', fontSize: '10px' }}>
					{divisionLabel === 'Today' && `Today ${get24HTime(notification.created)}`}
				</Typography>
			) : null}
			<div className={styles.notificationCard}>
				<div className={styles.notificationCardContent}>
					<AdaptiveCardViewer payload={notification.card} onExecuteAction={() => clickMarkAsRead()} />
					<div className={styles.notificationDelete} ref={ref}>
						<Button
							onClick={(e) => {
								e?.preventDefault();
								e?.stopPropagation();
								setOpen((s) => !s);
							}}
							variant="ghost_icon"
						>
							<Icon data={more_vertical} />
						</Button>
					</div>
				</div>
				<Menu open={open} anchorEl={ref.current} onMouseLeave={() => setOpen(false)}>
					<Menu.Item onClick={clickMarkAsRead} disabled={notification.seenByUser}>
						<Icon data={visibility} size={16} color={tokens.colors.text.static_icons__tertiary.hex} />
						<Typography group="navigation" variant="menu_title" as="span">
							Mark as read
						</Typography>
					</Menu.Item>
					<Menu.Item onClick={clickDelete}>
						<Icon data={delete_to_trash} size={16} color={tokens.colors.text.static_icons__tertiary.hex} />{' '}
						<Typography group="navigation" variant="menu_title" as="span">
							Delete
						</Typography>
					</Menu.Item>
				</Menu>
			</div>
		</>
	);
};
