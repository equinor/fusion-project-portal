import { useCurrentUser } from '@portal/core';

import { Card, Typography, Button, Icon } from '@equinor/eds-core-react';

import { ProfileCardHeader } from '@portal/components';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import { external_link, tag_relations } from '@equinor/eds-icons';

import { PersonPosition } from '@portal/types';
import { getFusionPortalURL } from '@portal/utils';
import { useFrameworkCurrentContext, useRelationsByType } from '@equinor/portal-core';

const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	`,
	PositionWrapper: styled.div`
		border: 1px solid #a3a3a3;
		border-radius: 4px;
	`,
	ProjectButton: styled(Button)`
		width: 100%;
		border-radius: 0;
		border-bottom: 1px solid #a3a3a3;
		> * {
			justify-content: space-between;
		}

		:hover {
			border-radius: 0;
			border-bottom: 1px solid #a3a3a3;
		}
	`,
	PositionButton: styled(Button)`
		padding: 0.5rem 1rem;
		display: flex;
		align-items: center;
		height: auto;
	`,
	Icon: styled(Icon)`
		padding-right: 1rem;
	`,
};

export const ProjectPosition = ({ positions }: { positions?: PersonPosition[] }) => {
	const context = useFrameworkCurrentContext();
	const equinorTask = useRelationsByType('OrgChart', context?.id);

	return (
		<Style.Wrapper>
			{positions &&
				positions.length > 0 &&
				positions
					.filter((item) => {
						return (
							item.appliesTo &&
							new Date(item.appliesTo) > new Date() &&
							item.project.id === equinorTask[0]?.externalId
						);
					})
					?.map((position) => (
						<Style.PositionWrapper key={position.id}>
							<Style.ProjectButton
								target="_blank"
								name={position.project.name}
								aria-label={position.project.name}
								href={`${getFusionPortalURL()}/apps/pro-org/${position.project.id}`}
								variant="ghost"
								role="link"
							>
								<Typography>{position.project.name}</Typography>
								<Icon data={external_link} size={16} />
							</Style.ProjectButton>
							<Style.PositionButton
								target="_blank"
								name={position.name}
								aria-label={position.name}
								href={`${getFusionPortalURL()}/apps/pro-org/${position.project.id}/chart?instanceId=${
									position.id
								}&positionId=${position.positionId}`}
								variant="ghost"
								role="link"
							>
								<Style.Icon data={tag_relations} />
								<div>
									<Typography color={tokens.colors.interactive.primary__resting.hex}>
										{position.name}
									</Typography>
									<Typography>
										<>
											{position.appliesFrom &&
												new Date(position.appliesFrom).toLocaleDateString('en-US')}
											{' - '}
											{position.appliesTo &&
												new Date(position.appliesTo).toLocaleDateString('en-US')}
											({position.workload}%)
										</>
									</Typography>
								</div>
							</Style.PositionButton>
						</Style.PositionWrapper>
					))}
		</Style.Wrapper>
	);
};

export const User = () => {
	const user = useCurrentUser();

	return (
		<Card elevation="raised">
			<ProfileCardHeader user={user.data} trigger="click" />
			<ProjectPosition positions={user.data?.positions} />
		</Card>
	);
};
