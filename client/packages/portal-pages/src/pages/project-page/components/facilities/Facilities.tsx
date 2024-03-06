import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useFrameworkCurrentContext, useOnboardedContexts } from '@equinor/portal-core';
import { useRelationsByType } from '@portal/core';

import { InfoIcon } from '@portal/ui';

const Styles = {
	Heading: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	`,
	LinkWrapper: styled.span`
		display: flex;
		align-items: center;
		gap: 0.5rem;
	`,
	Nav: styled.nav`
		padding: 0 1rem;
		gap: 0.5rem;
		display: flex;
		flex-wrap: wrap;
	`,
};

export const Facilities = () => {
	const currentContext = useFrameworkCurrentContext();
	const { onboardedContexts } = useOnboardedContexts();
	const { data: facilities } = useRelationsByType('Facility', currentContext?.id);

	if (facilities.length === 0) return null;

	return (
		<div>
			<Styles.Heading>
				<Typography variant="h5">Facilities</Typography>
				<InfoIcon message="The following links, navigates to the related facilities" />
			</Styles.Heading>
			<Styles.Nav>
				{facilities.map((facility, index) => {
					const isEnabledContext = Boolean(
						onboardedContexts?.find(
							(context) => context.externalId === facility.externalId && context.type === facility.type.id
						)
					);
					return (
						<Styles.LinkWrapper key={facility.id}>
							<Typography
								link={isEnabledContext}
								title={
									isEnabledContext
										? facility.title
										: `Facility ${facility.title} is not enabled context.`
								}
								href={`/facility/${facility.id}`}
							>
								{facility.title}
							</Typography>
							{facilities.length > index + 1 && <span>|</span>}
						</Styles.LinkWrapper>
					);
				})}
			</Styles.Nav>
		</div>
	);
};
