import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormattedError, Portal } from '../types';
import {
	createPortalQuery,
	deletePortalByIdQuery,
	getPortalByIdQuery,
	getPortalsQuery,
	updatePortalQuery,
} from '../query/portal-query';
import { PortalCreateInputs, PortalInputs } from '../schema';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useSnackBar } from './use-snack-bar';

export const useGetPortals = () => {
	const client = useHttpClient('portal-client');

	return useQuery<Portal[], FormattedError>({
		queryKey: ['portals'],
		queryFn: ({ signal }) => getPortalsQuery(client, signal),
	});
};

export const useGetPortal = (portalId?: string) => {
	const client = useHttpClient('portal-client');

	return useQuery<Portal, FormattedError>({
		queryKey: ['portal', { portalId }],
		queryFn: ({ signal }) => getPortalByIdQuery(client, portalId, signal),
		enabled: Boolean(portalId),
	});
};

export const useDeletePortal = () => {
	const client = useHttpClient('portal-client');
	const queryClient = useQueryClient();

	const { sendMessage } = useSnackBar();
	return useMutation<boolean, FormattedError, Portal | undefined, Portal | undefined>({
		mutationFn: (portal) => deletePortalByIdQuery(client, portal?.id),
		onError(_, portal) {
			sendMessage(`Failed to delete  - ${portal?.name || 'Portal'}`, 'Error');
		},
		onSuccess(_, portal) {
			queryClient.invalidateQueries({ queryKey: ['portals'] });
			sendMessage(`Portal ${portal?.name}  deleted successfully`, 'Info');
		},
	});
};

export const useCreatePortal = () => {
	const client = useHttpClient('portal-client');

	const queryClient = useQueryClient();

	const { sendMessage } = useSnackBar();

	return useMutation<PortalInputs, FormattedError, PortalInputs, PortalInputs>({
		mutationKey: ['create-portal'],
		mutationFn: (body) => createPortalQuery(client, body),
		onError() {
			sendMessage('Failed to create portal', 'Error');
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['create-portal'] });
			sendMessage('Portal created success', 'Info');
		},
	});
};

export const useUpdatePortal = (portalId: string) => {
	const client = useHttpClient('portal-client');

	const queryClient = useQueryClient();

	const { sendMessage } = useSnackBar();

	return useMutation<boolean, FormattedError, PortalInputs, PortalInputs>({
		mutationKey: ['portal', { portalId }],
		mutationFn: (body) => updatePortalQuery(client, body),
		onError() {
			sendMessage('Failed to update portal', 'Error');
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['portal'] });
			sendMessage('Portal updated success', 'Info');
		},
	});
};
