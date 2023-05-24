type NotificationKeys = typeof mutationKeys;

const baseKey = ['notifications'] as const;

const mutationKeys = {
	baseKey: baseKey,
	read: [...baseKey, 'read'],
	deleteMutation: [...baseKey, 'delete'],
} as const;

/**
 * MutationKeys for notifications
 */
export function useNotificationMutationKeys(): Readonly<NotificationKeys> {
	return mutationKeys;
}
