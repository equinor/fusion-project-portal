import { FC } from 'react';

export const shouldRenderIcon = (
	icon:
		| string
		| {
				component: FC;
				name: string;
		  }
) => {
	return typeof icon === 'object' && !icon.component({});
};
