import { IHttpClient, useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OnboardedContext, PortalApplication } from '../types';
import { useSnackBar } from './use-snack-bar';
import { mutateAddPortalAppWithContexts, mutateRemovePortalAppWithContexts } from '../query/apps-mutations';

export type ContextAppResult = {
	appKey: string;
	contextId: string;
	portalId: string;
	status: 'failed' | 'success';
};

export const useAddAppWithContexts = (portalId?: string) => {
	const client = useHttpClient('portal-client');
	const queryClient = useQueryClient();
	const { sendMessage } = useSnackBar();
	return useMutation({
		mutationFn: async ({ appKey, contextIds }: { appKey: string; contextIds: string[] }) => {
			return addPortalAppWithContexts(client, appKey, contextIds, portalId);
		},
		onMutate: ({ appKey, contextIds }) => {
			return mutateAddPortalAppWithContexts(queryClient, appKey, contextIds, portalId);
		},
		onError(_err, _apps, context) {
			sendMessage('App failed to be added with selected contexts', 'Error');
			queryClient.setQueryData(['portal-onboarded-apps', portalId, _apps.appKey], context?.prevApp);
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['portal-apps'] });
			queryClient.invalidateQueries({ queryKey: ['portal-onboarded-app'] });
			sendMessage('App added successful with selected contexts', 'Info');
		},
	});
};

export const useRemoveAppWithContexts = (portalId?: string) => {
	const client = useHttpClient('portal-client');
	const queryClient = useQueryClient();
	const { sendMessage } = useSnackBar();

	return useMutation({
		mutationFn: async ({ appKey, contextIds }: { appKey: string; contextIds: string[] }) => {
			return removePortalAppWithContexts(client, appKey, contextIds, portalId);
		},
		onMutate: ({ appKey, contextIds }) => {
			return mutateRemovePortalAppWithContexts(queryClient, appKey, contextIds, portalId);
		},
		onError(_err, _apps, context) {
			sendMessage('App failed to be removed from contexts', 'Error');
			queryClient.setQueryData(['portal-onboarded-app', portalId, _apps.appKey], context?.prevApp);
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['portal-onboarded-app'] });
			sendMessage('App successfully removed from contexts', 'Info');
		},
	});
};

const addPortalAppWithContext = async (client: IHttpClient, contextId: string, appKey: string, portalId: string) => {
	const response = await client.fetch<Response>(`api/portals/${portalId}/contexts/${contextId}/apps`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			appKey,
		}),
	});

	if (!response.ok) {
		return { appKey, contextId, portalId, status: 'failed' } as ContextAppResult;
	}

	return { appKey, contextId, portalId, status: 'success' } as ContextAppResult;
};

const removePortalAppWithContext = async (client: IHttpClient, contextId: string, appKey: string, portalId: string) => {
	const response = await client.fetch<Response>(`api/portals/${portalId}/contexts/${contextId}/apps/${appKey}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		return { appKey, contextId, portalId, status: 'failed' } as ContextAppResult;
	}

	return { appKey, contextId, portalId, status: 'success' } as ContextAppResult;
};

const addPortalAppWithContexts = async (
	client: IHttpClient,
	appKey: string,
	contextsIds: string[],
	portalId?: string
) => {
	if (!portalId) return [] as ContextAppResult[];
	const results: ContextAppResult[] = [];

	for (const contextId of contextsIds) {
		const result = await addPortalAppWithContext(client, contextId, appKey, portalId);
		results.push(result);
	}

	return results as ContextAppResult[];
};

const removePortalAppWithContexts = async (
	client: IHttpClient,
	appKey: string,
	contextIds: string[],
	portalId?: string
) => {
	if (!portalId) return [] as ContextAppResult[];
	const results: ContextAppResult[] = [];

	for (const contextId of contextIds) {
		const result = await removePortalAppWithContext(client, contextId, appKey, portalId);
		results.push(result);
	}

	return results as ContextAppResult[];
};
