import { Chip } from '@equinor/eds-core-react';
import { FC } from 'react';
import { AppReference } from '../types/types';

export const AppChips: FC<{ apps: AppReference[] }> = ({ apps }) => {
	return (
		<div>
			{apps?.map((app) => (
				<Chip key={app.key}>{app.name}</Chip>
			))}
		</div>
	);
};
