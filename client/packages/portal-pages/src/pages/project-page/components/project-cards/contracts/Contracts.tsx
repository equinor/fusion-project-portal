import { Typography } from '@equinor/eds-core-react';
import { StyledCardWrapper, StyledContent, StyledHeader } from '../styles';
import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Relations } from '../types';
import { css } from '@emotion/css';
import { DateTime } from 'luxon';

export async function getContextRelations(
	client: IHttpClient,
	contextId?: string,
	signal?: AbortSignal
): Promise<Relations[] | undefined> {
	if (!contextId) return;
	const res = await client.fetch(`/contexts/${contextId}/relations`, { signal });
	if (!res.ok) throw res;
	return (await res.json()) as Relations[];
}

export const useContextRelationsQuery = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('context');
	const { currentContext } = useFramework().modules.context;
	const contextId = currentContext?.id;
	return useQuery({
		queryKey: ['context-relations', contextId],
		queryFn: async ({ signal }) => getContextRelations(await client, contextId, signal),
	});
};

type RelationsTypes = 'EquinorTask' | 'Contract' | 'ProjectMaster' | 'PimsDomain' | 'Project';

export function useRelationsByType(type: RelationsTypes) {
	const { data } = useContextRelationsQuery();
	return data?.filter((relation) => relation.type.id === type) || [];
}

const styles = {
	contractItem: css``,
	contractList: css`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-height: 500px;
		width: 100%;
		overflow: auto;
	`,
};

function verifyDate(date?: string): string {
	return date
		? new Date(date).toString() !== 'Invalid Date'
			? DateTime.fromJSDate(new Date(date)).toFormat('dd LLL yyyy')
			: '-'
		: '-';
}

export const Contracts = () => {
	const contracts = useRelationsByType('Contract');
	return (
		<StyledCardWrapper>
			<StyledHeader>
				<Typography variant="h5">Contracts</Typography>
			</StyledHeader>
			<StyledContent>
				<div className={styles.contractList}>
					{contracts.map((contract) => (
						<div className={styles.contractItem} key={contract.id}>
							<Typography variant="h6">{contract.title}</Typography>
							<Typography variant="overline">
								{contract.value.contractNumber} {contract.value.companyName}
								{verifyDate(contract.value.endDate)}
							</Typography>
						</div>
					))}
				</div>
			</StyledContent>
		</StyledCardWrapper>
	);
};
