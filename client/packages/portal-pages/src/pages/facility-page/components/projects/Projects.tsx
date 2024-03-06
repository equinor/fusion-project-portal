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

export const Projects = () => {
	const currentContext = useFrameworkCurrentContext();
	const { onboardedContexts } = useOnboardedContexts();
	const { data: projects } = useRelationsByType('ProjectMaster', currentContext?.id);

	if (projects.length === 0) return null;

	return (
		<div>
			<Styles.Heading>
				<Typography variant="h5">Projects</Typography>
				<InfoIcon message="The following links, navigates to the related projects" />
			</Styles.Heading>
			<Styles.Nav>
				{projects.map((project, index) => {
					const isEnabledContext = Boolean(
						onboardedContexts?.find(
							(context) => context.externalId === project.externalId && context.type === project.type.id
						)
					);
					return (
						<Styles.LinkWrapper key={project.id}>
							<Typography
								link={isEnabledContext}
								title={
									isEnabledContext
										? project.title
										: `Project ${project.title} is not enabled context.`
								}
								href={`/project/${project.id}`}
							>
								{project.title}
							</Typography>
							{projects.length > index + 1 && <span>|</span>}
						</Styles.LinkWrapper>
					);
				})}
			</Styles.Nav>
		</div>
	);
};
