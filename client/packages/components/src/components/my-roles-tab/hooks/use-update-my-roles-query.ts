import { PersonRole, Role } from '@portal/types';

import { useFramework } from '@equinor/fusion-framework-react';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';
import { mutateArray } from '@portal/utils';

import { useMemo } from 'react';

type UpdateProps = { roleName: string; isActive: boolean };

export const useUpdateUserRoleQuery = (roles?: Role[], userId?: string) => {
	const client = useFramework().modules.serviceDiscovery.createClient('people');

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
		mutationFn: async ({ roleName, isActive }: UpdateProps) => {
			const currentMyRoles = queryClient.getQueryData<Role[]>(['my-roles']);
			if (!currentMyRoles) return;

			const data = await (
				await client
			).json<PersonRole>(`/persons/${userId}/roles/${roleName}`, {
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
		onMutate: async ({ roleName, isActive }: UpdateProps) => {
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

export const useUpdateUserRoles = (roles?: Role[], userId?: string) => {
	return useUpdateUserRoleQuery(roles, userId);
};

export const useUpdateMyRoles = (roles?: Role[]) => {
	const user = useCurrentUser();
	return useUpdateUserRoleQuery(roles, user?.localAccountId);
};
