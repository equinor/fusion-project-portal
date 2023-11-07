import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { Style as BaseStyle } from '../my-roles-tab/MyRolesTab';

import { arrow_back, tag_relations } from '@equinor/eds-icons';
import styled from '@emotion/styled';
import { tokens } from '@equinor/eds-tokens';
import { PersonPosition } from '@portal/types';
import { getFusionPortalURL } from '@portal/utils';
import { PortalMessage } from '@portal/ui';

const Style = {
	...BaseStyle,
	PositionWrapper: styled.div`
		border: 1px solid #a3a3a3;
		border-radius: 4px;
		margin-left: 0.5rem;
	`,
	ProjectButton: styled(Button)`
		padding: 0.5rem;
		width: 100%;
		border-radius: 0;
		border-bottom: 1px solid #a3a3a3;
		> * {
			justify-content: start;
		}

		:hover {
			border-radius: 0;
			border-bottom: 1px solid #a3a3a3;
		}
	`,
	PositionButton: styled(Button)`
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		height: auto;
	`,
	Icon: styled(Icon)`
		padding-right: 1rem;
	`,
};

export const MyAllocationTab = ({ onClick, positions }: { onClick: VoidFunction; positions?: PersonPosition[] }) => {
	return (
		<Style.Wrapper>
			<Style.TopWrapper>
				<Button variant="ghost_icon" onClick={onClick} name="Back Button" aria-label="Back" role="button">
					<Icon data={arrow_back} />
				</Button>

				<Typography variant="h6">My Allocation</Typography>
			</Style.TopWrapper>
			{positions && positions.length > 0 ? (
				positions
					.filter((item) => item.appliesTo && new Date(item.appliesTo) > new Date())
					?.map((position) => (
						<Style.PositionWrapper key={position.id}>
							<Style.ProjectButton
								as={'a'}
								target="_blank"
								name={position.project.name}
								aria-label={position.project.name}
								href={`${getFusionPortalURL()}/apps/pro-org/${position.project.id}`}
								variant="ghost"
								role="project-link"
							>
								<Typography>{position.project.name}</Typography>
							</Style.ProjectButton>
							<Style.PositionButton
								as={'a'}
								target="_blank"
								name={position.name}
								aria-label={position.name}
								href={`${getFusionPortalURL()}/apps/pro-org/${position.project.id}/chart?instanceId=${
									position.id
								}&positionId=${position.positionId}`}
								variant="ghost"
								role="position-link"
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
												new Date(position.appliesTo).toLocaleDateString('en-US')}{' '}
											({position.workload}%)
										</>
									</Typography>
								</div>
							</Style.PositionButton>
						</Style.PositionWrapper>
					))
			) : (
				<Style.NoContent>
					<PortalMessage type="NoContent" title="No Allocations">
						You have no allocations
					</PortalMessage>
				</Style.NoContent>
			)}
		</Style.Wrapper>
	);
};
