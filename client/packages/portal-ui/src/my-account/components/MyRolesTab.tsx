import { Button, Icon, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { PersonDetails, PersonRole } from '@portal/types';
import { Switch } from '@equinor/eds-core-react';
import { useFramework } from '@equinor/fusion-framework-react';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';
import { mutateArray } from 'packages/utils/src';
import { arrow_back } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useMemo } from 'react';

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
	Indicator: styled.div<{ isActive: boolean }>`
		height: 40px;
		width: 0.5rem;
		background-color: ${({ isActive }) =>
			isActive ? tokens.colors.interactive.primary__resting.hex : tokens.colors.interactive.disabled__text.hex};
	`,
};

type Role = PersonRole & {
	errorMessage?: string;
};

export const useUpdateMYRoleQuery = (roles?: Role[]) => {
	const client = useFramework().modules.serviceDiscovery.createClient('people');
	const user = useCurrentUser();
	const queryClient = useQueryClient();

	const sortedOnDemandSupportRolesTop = useMemo(
		() => roles?.sort((a, b) => (a.onDemandSupport === b.onDemandSupport ? 0 : a.onDemandSupport ? -1 : 1)),
		[roles]
	);

	const { data } = useQuery({
		queryKey: ['my-roles'],
		initialData: sortedOnDemandSupportRolesTop,
		queryFn: () => sortedOnDemandSupportRolesTop,
	});

	const { mutate } = useMutation({
		mutationKey: ['my-roles'],
		mutationFn: async ({ roleName, isActive }: { roleName: string; isActive: boolean }) => {
			const currentMyRoles = queryClient.getQueryData<Role[]>(['my-roles']);
			if (!currentMyRoles) return;

			const data = await (
				await client
			).json<PersonRole>(`/persons/${user?.localAccountId}/roles/${roleName}`, {
				method: 'Patch',
				body: JSON.stringify({ isActive }),
			});

			return mutateArray(currentMyRoles, 'name')
				.mutate((roles) => {
					if (data) {
						roles[data.name] = data;
					}
				})
				.getValue();
		},
		onSuccess(data) {
			queryClient.setQueryData(['my-roles'], data);
			queryClient.invalidateQueries(['current-user-info']);
		},
		onError(error, variables, context) {
			if (!context) return;

			const roles = mutateArray(context, 'name')
				.mutate((roles) => {
					roles[variables.roleName] = {
						...roles[variables.roleName],
						activeToUtc: undefined,
						errorMessage: (error as Error)?.message,
					};
				})
				.getValue();

			queryClient.setQueriesData(['my-roles'], roles);
		},
		onMutate: async ({ roleName, isActive }: { roleName: string; isActive: boolean }) => {
			const currentMyRoles = queryClient.getQueryData<Role[]>(['my-roles']);
			if (!currentMyRoles) return;

			return mutateArray(currentMyRoles, 'name')
				.mutate((roles) => {
					roles[roleName].isActive = isActive;
					roles[roleName].activeToUtc = undefined;
					roles[roleName].errorMessage = undefined;
				})
				.getValue();
		},
	});

	return { roles: data, mutate };
};

const expiresIn = (activeTo: string) => {
	const activeToDate = new Date(activeTo).getTime();
	const now = new Date().getTime();

	if (now > activeToDate) {
		return 'Expired';
	}

	const millisecondsInAnHour = 36e5;

	return `Expires in ${Math.ceil(Math.abs(activeToDate - now) / millisecondsInAnHour)} hours`;
};

export const MyRolesTab = ({ onClick, user }: { onClick: VoidFunction; user?: PersonDetails }) => {
	const { roles, mutate } = useUpdateMYRoleQuery(user?.roles);

	return (
		<Style.Wrapper>
			<Style.TopWrapper>
				<Button variant="ghost_icon" onClick={onClick}>
					<Icon data={arrow_back} />
				</Button>
				<Typography>My Roles</Typography>
			</Style.TopWrapper>

			{roles?.map((role) => (
				<Style.Role key={role.name}>
					<Style.RoleTop>
						<Style.Indicator isActive={role.isActive} />
						<div>
							<Typography>{role.displayName}</Typography>
							<Typography variant="overline">
								{role.name} ({String(role.isActive)}){' '}
								{role.errorMessage
									? role.errorMessage
									: role.activeToUtc && `- ${expiresIn(role.activeToUtc)}`}
							</Typography>
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
			))}
		</Style.Wrapper>
	);
};
