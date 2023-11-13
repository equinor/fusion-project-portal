import { FailedUpload, FormattedError, Incident } from '../types/types';
import { PortalMessage } from '@portal/ui';
import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';

type AttachmentApiFailedProps = {
	error: FormattedError | null;
	incident?: Incident;
	failedAttachments?: FailedUpload[];
	goBack: () => void;
};

const Style = {
	Wrapper: styled.div`
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
};
export const AttachmentsApiFailed = ({ goBack, incident, failedAttachments, error }: AttachmentApiFailedProps) => {
	return (
		<Style.Wrapper>
			<PortalMessage type="Error" title={error?.title || 'Attachments Error'}>
				{failedAttachments ? (
					<div>
						The ServiceNOW incident was successfully created, however there occurred an error with uploading
						attachments:
						{failedAttachments?.map((file) => (
							<p>
								{file.fileName}- {file.errorMessage}
							</p>
						))}
					</div>
				) : (
					<div>
						The ServiceNOW incident was successfully created, however the following error occurred while
						uploading:
						<ul>
							{error?.messages?.map((message) => (
								<li key={message}>{message}</li>
							))}
						</ul>
					</div>
				)}

				{incident && (
					<div>
						You can navigate to the newly created <a href={incident?.link}>ServiceNOW incident</a> and try
						to upload your attachments.
					</div>
				)}
			</PortalMessage>

			<Button onClick={() => goBack()} variant="ghost">
				Go back
			</Button>
		</Style.Wrapper>
	);
};
