export type Incident = {
  active: boolean;
  description: string;
  id: string;
  link: string;
  number: string;
  shortDescription: string;
  state: string;
  type: string;
};
export type ServiceNowError = {
  status: number | string;
  message?: string;
};

export type FormattedError = {
  errorMessage: string;
  status: number;
  statusDescription?: string;
};
type SuccededUpload = {
  succeeded: true;
  fileName: string;
  id: string;
};
type FailedUpload = {
  succeeded: false;
  errorMessage: string;
  fileName: string;
};
export type AttachmentResponse = SuccededUpload | FailedUpload;
