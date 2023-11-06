import { Icon } from '@equinor/eds-core-react';

import { Availability, PresenceInfo } from '../types/types';
import { account_circle, close_circle_outlined, help_outline } from '@equinor/eds-icons';

export function getPresenceInfo(status: Availability | undefined): PresenceInfo {
	if (!status) return { icon: <Icon data={help_outline} />, status: 'Unknown' };

	switch (status) {
		case 'Available':
			return {
				icon: <Icon color="#4bb748" data={account_circle} title={status} />,
				status: 'Available',
			};

		case 'Away':
			return {
				icon: <Icon color="#fbca36" data={account_circle} title={status} />,
				status: 'Away',
			};

		case 'BeRightBack':
			return {
				icon: <Icon color="#fbca36" data={account_circle} title={status} />,
				status: 'Be right back',
			};

		case 'Busy':
			return {
				icon: <Icon color="#eb0000" data={account_circle} title={status} />,
				status: 'Busy',
			};

		case 'DoNotDisturb': {
			return {
				icon: <Icon color="#eb0000" data={account_circle} title={status} />,
				status: 'Do not disturb',
			};
		}

		case 'Offline':
			return {
				icon: <Icon color="#bfbfbf" data={close_circle_outlined} title={status} />,
				status: 'Offline',
			};

		default: {
			return {
				icon: <Icon color="grey" data={close_circle_outlined} title={status} />,
				status: 'Unknown',
			};
		}
	}
}
