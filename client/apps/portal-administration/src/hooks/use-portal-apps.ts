import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppManifestResponse, FormattedError, PortalApp, PortalApplication } from '../types';

import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import {
	Result,
	addPortalApps,
	getOnboardedPortalAppByAppKey,
	getOnboardedPortalApps,
	getPortalAppsByPortalId,
	removePortalApps,
} from '../query/apps-queries';
import { useSnackBar } from './use-snack-bar';
import { mutateDeletePortalApps, mutatePortalApps as mutateAddPortalApps } from '../query/apps-mutations';

export const usePortalApps = (portalId?: string) => {
	const client = useHttpClient('portal-client');

	return useQuery<AppManifestResponse[], FormattedError>({
		queryKey: ['portal-apps', portalId],
		queryFn: ({ signal }) => getPortalAppsByPortalId(client, portalId, signal),
		enabled: Boolean(portalId),
	});
};

export const useGetPortalApps = (portalId?: string) => {
	const client = useHttpClient('portal-client');

	return useQuery<PortalApplication[], FormattedError>({
		queryKey: ['portal-onboarded-apps', portalId],
		queryFn: ({ signal }) => getOnboardedPortalApps(client, portalId, signal),
		enabled: Boolean(portalId),
	});
};

export const useGetPortalApp = (portalId?: string, appKey?: string) => {
	const client = useHttpClient('portal-client');

	return useQuery<PortalApplication, FormattedError>({
		queryKey: ['portal-onboarded-app', portalId, appKey],
		queryFn: ({ signal }) => getOnboardedPortalAppByAppKey(client, portalId, appKey, signal),
		enabled: Boolean(portalId && appKey),
	});
};

export const useAddPortalApps = (portalId?: string) => {
	const client = useHttpClient('portal-client');

	const queryClient = useQueryClient();
	const { sendMessage } = useSnackBar();

	return useMutation<
		Result[],
		FormattedError,
		PortalApplication[],
		{ prevApps: PortalApplication[]; newApps: PortalApplication[] }
	>({
		mutationFn: (apps) => addPortalApps(client, apps, portalId),
		onMutate: (apps) => {
			return mutateAddPortalApps(queryClient, portalId, apps);
		},
		onError(_err, _apps, context) {
			sendMessage('Apps failed to be added', 'Error');

			queryClient.setQueryData(['portal-onboarded-apps'], context?.newApps || []);
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['portal-apps'] });
			queryClient.invalidateQueries({ queryKey: ['portal-onboarded-apps'] });
			sendMessage('Apps added successful', 'Info');
		},
	});
};

export const useRemovePortalApps = (portalId?: string) => {
	const client = useHttpClient('portal-client');

	const queryClient = useQueryClient();
	const { sendMessage } = useSnackBar();

	return useMutation<
		Result[],
		FormattedError,
		PortalApplication[],
		{ prevApps: PortalApplication[]; newApps: PortalApplication[] }
	>({
		mutationFn: (apps) => removePortalApps(client, apps, portalId),
		onMutate: (apps) => {
			return mutateDeletePortalApps(queryClient, portalId, apps);
		},
		onError: (_err, _apps, context) => {
			sendMessage('Failed to remove apps from portal', 'Error');
			queryClient.setQueryData(['portal-apps', portalId], context?.prevApps || []);
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['portal-apps'] });
			queryClient.invalidateQueries({ queryKey: ['portal-onboarded-apps'] });
			sendMessage('Apps removed successfully', 'Info');
		},
	});
};
