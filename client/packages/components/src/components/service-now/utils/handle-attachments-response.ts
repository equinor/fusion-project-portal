import { AttachmentResponse, FailedUpload, SucceededUpload } from '../types/types';

export const handleAttachmentsResponse = (attachmentsResponse: AttachmentResponse[], attachmentsCount: number) => {
	const failedUploads: FailedUpload[] = [];
	const successfulUploads: SucceededUpload[] = [];

	const statusData = attachmentsResponse.reduce(
		(acc, a) => {
			if (!a.succeeded) {
				acc.failedUploads.push(a);
			} else {
				acc.successfulUploads.push(a);
			}
			return acc;
		},
		{ failedUploads, successfulUploads }
	);

	const status =
		statusData.failedUploads.length === attachmentsCount
			? 'Error'
			: statusData.failedUploads.length > 0
			? 'Waring'
			: 'Success';

	return { ...statusData, status } as {
		failedUploads: FailedUpload[];
		successfulUploads: SucceededUpload[];
		status: 'Error' | 'Waring' | 'Success';
	};
};
