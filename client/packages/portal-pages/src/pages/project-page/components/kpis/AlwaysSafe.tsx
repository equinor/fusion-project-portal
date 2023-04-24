import { KpiCard } from '@equinor/portal-ui';

export const AlwaysSafe = () => {
	return (
		<KpiCard
			isLoading={false}
			title="Always Safe last 12 months"
			items={[
				{ title: 'SIF', value: '0.34' },
				{ title: 'TRIF', value: '1.14' },
				{ title: 'FOF', value: '0.34' },
				{ title: 'Working Hours', value: '8.75 M' },
				{ title: 'Perfect HSE days', value: '96%' },
			]}
		/>
	);
};
