import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormattedError, PortalApp, PortalAppMutation } from '../types';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { OnboardAppInputs } from '../schema/app';
import { useSnackBar } from './use-snack-bar';
import { editOnboardedApps } from '../query/onboarded-apps-queries';
import { Result } from '../query/apps-queries';
import { mutateOnboardedApps } from '../query/onboarded-apps-mutations';

export const useOnboardedApps = () => {
	const client = useHttpClient('portal-client');

	return useQuery<PortalApp[]>({
		queryKey: ['onboarded-apps'],
		queryFn: async () => await client.fetch('api/onboarded-apps').then((response) => response.json()),
	});
};

export const useAddOnboardedApp = () => {
	const client = useHttpClient('portal-client');
	const { sendMessage } = useSnackBar();
	const queryClient = useQueryClient();
	return useMutation<string, FormattedError, OnboardAppInputs, OnboardAppInputs>({
		mutationKey: ['onboard-app'],
		mutationFn: async (body) => {
			return await client
				.fetch(`api/onboarded-apps`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				})
				.then((response) => response.text());
		},
		onSuccess() {
			sendMessage('App onboarded  successful', 'Info');
			queryClient.invalidateQueries({ queryKey: ['onboarded-apps'] });
		},
		onError() {
			sendMessage('Failed onboarding application', 'Error');
		},
	});
};

export const useDeleteOnboardedApp = () => {
	const client = useHttpClient('portal-client');
	const { sendMessage } = useSnackBar();
	const queryClient = useQueryClient();
	return useMutation<boolean, FormattedError, string, OnboardAppInputs>({
		mutationFn: async (appKey) => {
			const response = await (
				await client
			).fetch(`api/onboarded-apps/${appKey}`, {
				method: 'DELETE',
			});

			if (response.ok) return response.ok;

			throw new Error('Failed delete application');
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['onboarded-apps'] });
			sendMessage('Onboarded app successfully deleted', 'Info');
		},
		onError() {
			sendMessage('Failed delete application', 'Error');
		},
	});
};

export const useEditOnboardedApp = (appKey?: string) => {
	const client = useHttpClient('portal-client');
	const queryClient = useQueryClient();
	return useMutation<PortalAppMutation, FormattedError, PortalAppMutation, PortalAppMutation>({
		mutationKey: ['onboarded-app', appKey],
		mutationFn: async (body) => {
			return await client
				.fetch(`api/onboarded-apps/${appKey}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				})
				.then((response) => response.json());
		},

		onSettled() {
			queryClient.invalidateQueries({ queryKey: ['onboarded-apps'] });
		},
	});
};

export const useEditOnboardedApps = () => {
	const client = useHttpClient('portal-client');
	const queryClient = useQueryClient();
	const { sendMessage } = useSnackBar();
	return useMutation<
		Result[],
		FormattedError,
		PortalAppMutation[],
		{ prevApps: PortalAppMutation[]; newApps: PortalAppMutation[] }
	>({
		mutationFn: async (apps) => editOnboardedApps(client, apps),
		onMutate(apps) {
			return mutateOnboardedApps(queryClient, apps);
		},
		onError(_err, _apps, context) {
			sendMessage('Apps failed to be updated', 'Error');
			queryClient.setQueryData(['onboarded-apps'], context?.prevApps || []);
		},
		onSettled() {
			queryClient.invalidateQueries({ queryKey: ['onboarded-apps'] });
			sendMessage('Apps updated successful', 'Info');
		},
	});
};
