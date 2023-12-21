import { Button, Icon, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Role } from '@portal/types';
import { Switch } from '@equinor/eds-core-react';

import { arrow_back } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useUpdateMyRoles } from './hooks/use-update-my-roles-query';
import { expiresIn } from './utils/expires-in';

import { PortalMessage } from '@portal/ui';
import { ProgressLoader } from '@equinor/portal-ui';

export const Style = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem, 1rem;
	`,
	TopWrapper: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem, 0;
		align-items: center;
	`,
	Role: styled.div`
		display: flex;
		flex-direction: row;
		padding: 0.5rem;
		justify-content: space-between;
		border: 1px solid grey;
		border-radius: 4px;
		margin-left: 0.5rem;
	`,
	RoleTop: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	`,
	Indicator: styled.div<{ isActive: boolean; hasError?: boolean }>`
		height: 40px;
		width: 0.5rem;
		background-color: ${({ isActive, hasError }) =>
			hasError
				? tokens.colors.interactive.danger__resting.hex
				: isActive
				? tokens.colors.interactive.primary__resting.hex
				: tokens.colors.interactive.disabled__text.hex};
	`,
	NoContent: styled.div`
		height: 50vh;
	`,
	WrapperCenter: styled.div`
		height: 30vh;
		display: flex;
		justify-content: center;
	`,
};

export const MyRolesTab = ({ onClick, userRoles }: { onClick: VoidFunction; userRoles?: Role[] }) => {
	const { roles, mutate } = useUpdateMyRoles(userRoles);

	return (
		<Style.Wrapper>
			<Style.TopWrapper>
				<Button variant="ghost_icon" onClick={onClick} name="Back Button" aria-label="Back" role="button">
					<Icon data={arrow_back} />
				</Button>
				<Typography aria-label="My Roles" variant="h6">
					My Roles
				</Typography>
			</Style.TopWrapper>

			{roles && roles.length > 0 ? (
				roles.map((role) => (
					<Style.Role key={role.name}>
						<Style.RoleTop>
							<Style.Indicator isActive={role.isActive} hasError={Boolean(role.errorMessage)} />
							<div>
								<Typography aria-label={role.displayName}>{role.displayName}</Typography>
								{role.errorMessage ? (
									<Typography variant="overline" color={tokens.colors.interactive.danger__text.hex}>
										{role.errorMessage}
									</Typography>
								) : (
									<Typography variant="overline">
										{role.name} ({String(role.isActive)}){' '}
										{role.activeToUtc && `- ${expiresIn(role.activeToUtc)}`}
									</Typography>
								)}
							</div>
						</Style.RoleTop>

						{role.onDemandSupport && (
							<Switch
								checked={role.isActive}
								onChange={(e) => {
									mutate({ roleName: role.name, isActive: e.target.checked });
								}}
							/>
						)}
					</Style.Role>
				))
			) : userRoles ? (
				<Style.NoContent>
					<PortalMessage type="NoContent" title="No Roles">
						You have no roles assigned
					</PortalMessage>
				</Style.NoContent>
			) : (
				<Style.WrapperCenter>
					<ProgressLoader title="loading" />
				</Style.WrapperCenter>
			)}
		</Style.Wrapper>
	);
};
