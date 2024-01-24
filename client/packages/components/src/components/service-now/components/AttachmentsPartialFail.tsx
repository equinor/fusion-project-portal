import { Button } from '@equinor/eds-core-react';
import { Incident } from '../types/types';
import { PortalMessage } from '@portal/ui';
import styled from 'styled-components';

type AttachmentsPartialFailProps = {
	goBack: () => void;
	incident?: Incident;
};
const Style = {
	Wrapper: styled.div`
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
};
export const AttachmentsPartialFail = ({ goBack, incident }: AttachmentsPartialFailProps) => {
	return (
		<Style.Wrapper>
			<PortalMessage type="Error" title={'Some attachments failed to upload'}>
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
