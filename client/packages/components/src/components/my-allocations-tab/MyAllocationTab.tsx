import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { Style as BaseStyle } from '../my-roles-tab/MyRolesTab';

import { arrow_back, tag_relations } from '@equinor/eds-icons';
import styled from '@emotion/styled';
import { tokens } from '@equinor/eds-tokens';
import { PersonPosition } from '@portal/types';
import { getFusionPortalURL } from '@portal/utils';

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
				<Button variant="ghost_icon" onClick={onClick}>
					<Icon data={arrow_back} />
				</Button>

				<Typography>My Allocation</Typography>
			</Style.TopWrapper>
			{positions
				?.filter((item) => item.appliesTo && new Date(item.appliesTo) > new Date())
				?.map((item) => (
					<Style.PositionWrapper>
						<Style.ProjectButton
							as={'a'}
							target="_blank"
							href={`${getFusionPortalURL()}/apps/pro-org/${item.project.id}`}
							variant="ghost"
						>
							<Typography>{item.project.name}</Typography>
						</Style.ProjectButton>
						<Style.PositionButton
							as={'a'}
							target="_blank"
							href={`${getFusionPortalURL()}/apps/pro-org/${item.project.id}/chart?instanceId=${
								item.id
							}&positionId=${item.positionId}`}
							variant="ghost"
						>
							<Style.Icon data={tag_relations} />
							<div>
								<Typography color={tokens.colors.interactive.primary__resting.hex}>
									{item.name}
								</Typography>
								<Typography>
									<>
										{item.appliesFrom && new Date(item.appliesFrom).toLocaleDateString('en-US')}
										{' - '}
										{item.appliesTo && new Date(item.appliesTo).toLocaleDateString('en-US')} (
										{item.workload}%)
									</>
								</Typography>
							</div>
						</Style.PositionButton>
					</Style.PositionWrapper>
				))}
		</Style.Wrapper>
	);
};
