import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useNotificationCenter } from '../hooks/useNotificationCenter';
import { css } from '@emotion/css';
import { useNotification } from '../hooks/useNotification';

export function NotificationBell(): JSX.Element {
	const { onNotification } = useNotification();
	const notificationCenter = useNotificationCenter(onNotification);

	return (
		<div className={styles.pointer}>
			{notificationCenter.unreadNotificationsCount > 0 && (
				<div className={styles.circle}>{notificationCenter.unreadNotificationsCount}</div>
			)}
			<Icon
				className={styles.pointer}
				color={tokens.colors.interactive.primary__resting.hex}
				name={'notifications'}
			/>
		</div>
	);
}

const styles = {
	circle: css`
		justify-content: center;
		position: absolute;
		align-items: center;
		display: flex;
		border-radius: 50%;
		padding: 0.2rem;
		width: 16px;
		height: 16px;
		color: white;
		font-size: 14px;
		background: ${tokens.colors.interactive.warning__resting.hex};
		position: absolute;
		right: 2px;
		bottom: 5px;
	`,
	pointer: css`
		cursor: pointer;
	`,
};
