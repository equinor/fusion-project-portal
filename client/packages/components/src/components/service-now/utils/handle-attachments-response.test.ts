import { AttachmentResponse } from '../types/types';
import { handleAttachmentsResponse } from './handle-attachments-response';

describe('handleAttachmentsResponse', () => {
	test('returns correct status and arrays for successful uploads', () => {
		const attachmentsResponse: AttachmentResponse[] = [
			{ succeeded: true, fileName: 'file1.txt', id: '1' },
			{ succeeded: true, fileName: 'file2.txt', id: '2' },
		];

		const attachmentsCount = 2;

		const result = handleAttachmentsResponse(attachmentsResponse, attachmentsCount);

		expect(result.status).toBe('Success');
		expect(result.failedUploads).toHaveLength(0);
		expect(result.successfulUploads).toHaveLength(2);
	});

	test('returns correct status and arrays for failed uploads', () => {
		const attachmentsResponse: AttachmentResponse[] = [
			{ succeeded: false, errorMessage: 'File too large', fileName: 'file1.txt' },
			{ succeeded: false, errorMessage: 'Invalid format', fileName: 'file2.txt' },
		];

		const attachmentsCount = 2;

		const result = handleAttachmentsResponse(attachmentsResponse, attachmentsCount);

		expect(result.status).toBe('Error');
		expect(result.failedUploads).toHaveLength(2);
		expect(result.successfulUploads).toHaveLength(0);
	});

	test('returns correct status and arrays for mixed uploads', () => {
		const attachmentsResponse: AttachmentResponse[] = [
			{ succeeded: true, fileName: 'file1.txt', id: '1' },
			{ succeeded: false, errorMessage: 'Invalid format', fileName: 'file2.txt' },
		];

		const attachmentsCount = 2;

		const result = handleAttachmentsResponse(attachmentsResponse, attachmentsCount);

		expect(result.status).toBe('Waring');
		expect(result.failedUploads).toHaveLength(1);
		expect(result.successfulUploads).toHaveLength(1);
	});

	test('returns correct status and arrays for empty response', () => {
		const attachmentsResponse: AttachmentResponse[] = [];
		const attachmentsCount = 0;

		const result = handleAttachmentsResponse(attachmentsResponse, attachmentsCount);

		expect(result.status).toBe('Success');
		expect(result.failedUploads).toHaveLength(0);
		expect(result.successfulUploads).toHaveLength(0);
	});
});
