import { TextField, Button, Typography, CircularProgress, Icon } from '@equinor/eds-core-react';
import { useForm, SubmitHandler } from 'react-hook-form';

import styled from 'styled-components';

import { zodResolver } from '@hookform/resolvers/zod';
import { FileUpload } from './file-upload/FileUpload';
import { useCreateServiceNowIncidents, useUploadAttachmentsServiceNowIncidents } from '../hooks/use-service-now-query';
import { useIncidentMeta } from '../hooks/use-incident-meta';

import { useEffect, useState } from 'react';
import { error_filled } from '@equinor/eds-icons';
import { MessageCard } from '@portal/ui';
import { UploadStatus } from '../types/types';
import { AttachmentsApiFailed } from './AttachmentsApiFailed';
import { AttachmentsPartialFail } from './AttachmentsPartialFail';
import { HelpInput, Inputs, inputSchema } from '../schema';
import InfoMessage from './InfoMessage';
import { tokens } from '@equinor/eds-tokens';

type HelpNeededProps = {
	onClose: () => void;
};

const Style = {
	Wrapper: styled.div`
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	`,
	From: styled.form`
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	ErrorWrapper: styled.div`
		padding-top: 1rem;
		padding-bottom: 1rem;
	`,
	ButtonWrapper: styled.div`
		display: flex;
		gap: 1rem;
	`,
};

const formatDescription = (description: string) => {
	return `
      Type: I need help\n\nWhat do you need assistance with?\n${description}\n\n
  `;
};

export const HelpNeeded = ({ onClose }: HelpNeededProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset,
		watch,
		setError,
		clearErrors,
	} = useForm<Inputs>({
		resolver: zodResolver(inputSchema),
	});

	const {
		data: incident,
		mutateAsync: createIncident,
		error: createIncidentError,
		reset: resetCreate,
	} = useCreateServiceNowIncidents();

	const { mutateAsync: uploadFiles, error: uploadError } = useUploadAttachmentsServiceNowIncidents();

	const [uploadFilesErrors, setUploadFilesErrors] = useState<UploadStatus>();

	const metadata = useIncidentMeta();

	const onSubmit: SubmitHandler<HelpInput> = async ({ shortDescription, description, files }) => {
		const incident = await createIncident({
			shortDescription,
			description: formatDescription(description),
			metadata,
		});

		const filesArray = Array.from(files) as File[];
		if (filesArray.length > 0 && incident?.id) {
			const uploadStatus = await uploadFiles({ files: filesArray, incidentId: incident.id });
			if (uploadStatus.status !== 'Error') {
				setUploadFilesErrors(uploadStatus);
			}
		}

		if (incident) {
			reset();
		}
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			onClose();
		}
	}, [isSubmitSuccessful]);

	if (uploadFilesErrors?.status === 'Error' || uploadError) {
		return (
			<AttachmentsApiFailed
				error={uploadError}
				incident={incident}
				failedAttachments={uploadFilesErrors?.failedUploads}
				goBack={() => {
					onClose();
				}}
			/>
		);
	}
	if (uploadFilesErrors?.status === 'Waring') {
		return (
			<AttachmentsPartialFail
				incident={incident}
				goBack={() => {
					onClose();
				}}
			/>
		);
	}

	return (
		<Style.Wrapper>
			<Typography variant="h5"> I need help</Typography>

			<InfoMessage message="Provide more details for faster, better, and more relevant support." />
			{Object.values(errors).length > 0 && (
				<Style.ErrorWrapper>
					<MessageCard
						type="Error"
						title="Error submission is not valid"
						messages={Object.values(errors).map((error) => error.message?.toString() || '')}
					/>
				</Style.ErrorWrapper>
			)}

			{createIncidentError && (
				<Style.ErrorWrapper>
					<MessageCard type="Error" title={createIncidentError.title} messages={createIncidentError.messages}>
						<Style.ButtonWrapper>
							<Button
								onClick={() => {
									reset();
									resetCreate();
								}}
							>
								Reset
							</Button>
							<Button onClick={() => onClose()}>Close</Button>
						</Style.ButtonWrapper>
					</MessageCard>
				</Style.ErrorWrapper>
			)}

			<Style.From onSubmit={handleSubmit(onSubmit)}>
				<TextField
					{...register('shortDescription')}
					id="textfield-short-description"
					variant={errors.shortDescription && 'error'}
					helperText={errors.shortDescription?.message}
					inputIcon={errors.shortDescription && <Icon data={error_filled} title="Error" />}
					label="Short description *"
					placeholder="Ticket title, please keep short and concise"
					maxLength={51}
					required
				/>

				<TextField
					{...register('description')}
					id="textfield-description"
					variant={errors.description && 'error'}
					placeholder="Add description"
					helperText={errors.description?.message}
					label="What do you need assistance with? *"
					inputIcon={errors.description && <Icon data={error_filled} title="Error" />}
					multiline
					rows={5}
					required
				/>
				<InfoMessage message="Add images you feel might help the S@E team understand what you need help with." />
				<FileUpload
					title="Drop pictures here, or click browse."
					acceptTitle="accept png & jpeg"
					inputProps={{ ...register('files') }}
					files={watch('files')}
					accept="image/png, image/jpeg"
					onDrop={(files) => {
						clearErrors();

						if (files.every((file) => file.type === 'image/jpeg' || file.type === 'image/png')) {
							reset({ files });
							return;
						}
						setError('files', {
							message: 'One or more files not supported, supported file are jpeg and png',
						});
					}}
					onRemoved={(files) => {
						clearErrors();
						reset({ files });
					}}
				/>
				<Typography
					group="paragraph"
					variant="body_short"
					color={tokens.colors.text.static_icons__tertiary.hex}
				>
					NB: Check that you capture the <b>entire</b> screen when uploading a screenshot
				</Typography>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? <CircularProgress size={16} /> : 'Submit'}
				</Button>
				<Button onClick={() => onClose()}>Cancel</Button>
			</Style.From>
		</Style.Wrapper>
	);
};
