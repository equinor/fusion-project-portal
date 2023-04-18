import { KpiCard } from '@equinor/portal-ui';
import { useHandoverQuery } from './useHandoverQuery';
import { getStatusBarData, numberFormat } from './utils';

export const Handover = () => {
	const { data, isLoading, error } = useHandoverQuery();
	const statusData = getStatusBarData(data);

	const length = data?.length || 0;

	return (
		<KpiCard
			isLoading={isLoading}
			error={error as Error}
			title="Handover"
			items={[
				{
					title: 'Total CP',
					value: numberFormat(length),
				},
				{
					title: 'RFO Accepted',
					value: numberFormat(statusData['RFOC Accepted']),
				},
				{
					title: 'RFO Sent',
					value: numberFormat(statusData['RFOC Sent']),
				},
				{
					title: 'RFO Partly',
					value: statusData['RFOC Partly'].toString(),
				},
				{
					title: 'RFO OS',
					value: numberFormat(statusData.OS),
				},

				{
					title: 'RFO vs target',
					value: numberFormat(statusData['RFOC Accepted'] + statusData['RFOC Sent'] - statusData.targetSum),
				},
				{
					title: 'RFO overdue',
					value: numberFormat(statusData.overdue),
				},
				{
					title: 'RFO %',
					value: `${(((statusData['RFOC Accepted'] + statusData['RFOC Sent']) / length || 0) * 100).toFixed(
						1
					)}%`,
				},
			]}
		/>
	);
};
