import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { useFramework } from '@equinor/fusion-framework-react';
import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { useQuery } from 'react-query';
import {
	StyledCardWrapper,
	StyledContent,
	StyledHeader,
	StyledContentRow,
	StyledContentItem,
	StyledCardWithBackgroundWrapper,
} from './styles';
import { Relations } from './types';
import { css } from '@emotion/css';

export type ProjectMaster = {
	facilities: string[];
	projectCategory: string;
	cvpid: string;
	documentManagementId: string;
	phase: string;
	portfolioOrganizationalUnit: string;
} & Record<string, unknown>;

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

function getBackgroundURL(instCode?: string) {
	if (!instCode) return;
	return `https://stiddata.equinor.com/public/${instCode}.jpg`;
}
const styles = {
	headerTitle: css`
		margin: 2rem;
	`,
};

export const ProjectDetails = () => {
	const currentContext = useFrameworkCurrentContext<ProjectMaster>();
	const equinorTask = useRelationsByType('EquinorTask');
	return (
		<StyledCardWithBackgroundWrapper imageURL={getBackgroundURL(currentContext?.value.facilities[0])}>
			<StyledHeader className={styles.headerTitle}>
				<Typography variant="h5">{currentContext?.title}</Typography>
				<Typography variant="h6">
					{currentContext?.value.projectCategory.replace(new RegExp('-|_/*'), ' ')}
				</Typography>
			</StyledHeader>
			<StyledContentRow>
				<StyledContent>
					<StyledContentItem>
						<Typography variant="overline">Phase</Typography>
						<Typography>{currentContext?.value.phase}</Typography>
					</StyledContentItem>

					<StyledContentItem>
						<Typography variant="overline">CVP ID</Typography>
						<Typography>{currentContext?.value.cvpid}</Typography>
					</StyledContentItem>
				</StyledContent>
				{equinorTask[0]?.value.orgUnitSapId && (
					<StyledCardWrapper.Actions alignRight={true}>
						<Button
							as="a"
							variant="ghost"
							href={`https://fusion.equinor.com/apps/one-equinor/org-unit/${equinorTask[0].value.orgUnitSapId}/info`}
							aria-label="View in this project master in One Equinor"
							target="_blank"
						>
							View in One Equinor
							<Icon name="chevron_right" />
						</Button>
					</StyledCardWrapper.Actions>
				)}
			</StyledContentRow>
		</StyledCardWithBackgroundWrapper>
	);
};
