import { Icon } from '@equinor/eds-core-react';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import { settings } from '@equinor/eds-icons';

export const AdminButton = () => {
	const isAdmin = useIsAdmin();

	return !isAdmin ? <Icon data={settings} /> : null;
};
