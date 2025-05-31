export type Variant = 'Warning' | 'Error' | 'Info' | 'NoContent';

export type Message = {
	type?: Variant;
	title: string;
	messages?: string[];
};

export type Incident = {
	active: boolean;
	description: string;
	id: string;
	link: string;
	number: string;
	shortDescription: string;
	assistanceDescription: string;
	state: string;
	type: string;
};
export type ServiceNowError = {
	status: number | string;
	message?: string;
};

export type FormattedError = {
	status: number;
} & Message;

export type SucceededUpload = {
	succeeded: true;
	fileName: string;
	id: string;
};
export type FailedUpload = {
	succeeded: false;
	errorMessage: string;
	fileName: string;
};
export type AttachmentResponse = SucceededUpload | FailedUpload;

export type UploadStatus = {
	failedUploads: FailedUpload[];
	successfulUploads: SucceededUpload[];
	status: 'Error' | 'Waring' | 'Success';
};
