import { Button, Icon, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useFrameworkCurrentContext, useOnboardedContexts, useRelationsByType } from '@equinor/portal-core';
import { useFramework } from '@equinor/fusion-framework-react';
import { platform } from '@equinor/eds-icons';

export type ProjectMaster = {
	facilities: string[];
	projectCategory: string;
	cvpid: string;
	documentManagementId: string;
	phase: string;
	portfolioOrganizationalUnit: string;
} & Record<string, unknown>;

const Styles = {
	Heading: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	`,
	Button: styled(Button).withConfig({ displayName: 'facility-button' })`
		margin: 0.2rem;
	`,
};

export const Facilities = () => {
	const currentContext = useFrameworkCurrentContext();
	const { onboardedContexts } = useOnboardedContexts();
	const { data: facility } = useRelationsByType('Facility', currentContext?.id);
	const { context } = useFramework().modules;

	if (facility.length === 0) return null;

	return (
		<div>
			<Styles.Heading>
				<Typography variant="h5">Facilities</Typography>
				<Typography variant="meta">Relations</Typography>
			</Styles.Heading>
			<div>
				{facility.map((facility) => {
					const isEnabledContext = Boolean(
						onboardedContexts?.find(
							(context) => context.externalId === facility.externalId && context.type === facility.type.id
						)
					);
					return (
						<Styles.Button
							key={facility.id}
							variant="ghost"
							title={
								isEnabledContext ? facility.title : `Facility ${facility.title} is not enabled context.`
							}
							disabled={!isEnabledContext}
							onClick={() => context?.setCurrentContextByIdAsync(facility.id)}
						>
							<Icon data={platform} />
							{facility.externalId} - {facility.title}
						</Styles.Button>
					);
				})}
			</div>
		</div>
	);
};
