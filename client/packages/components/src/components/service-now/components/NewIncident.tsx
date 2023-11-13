import { TextField, Button, Typography, CircularProgress, Icon } from '@equinor/eds-core-react';
import { useForm, SubmitHandler } from 'react-hook-form';

import styled from 'styled-components';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUpload } from './FileUpload';
import { useCreateServiceNowIncidents, useUploadAttachmentsServiceNowIncidents } from '../hooks/use-service-now-query';
import { useIncidentMeta } from '../hooks/use-insident-meta';

import { useEffect, useState } from 'react';
import { error_filled } from '@equinor/eds-icons';
import { MessageCard } from '@portal/ui';
import { UploadStatus } from '../types/types';

type NewIncidentProps = {
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
};

const inputSchema = z
	.object({
		shortDescription: z.string().min(3, 'Short description must contain at least 3 character(s)').max(50),
		description: z
			.string()
			.min(3, 'Description must contain at least 3 character(s)')
			.max(300, 'Description can contain at most 300 character(s)'),
		files: z.any().nullable(),
	})
	.required();

type Inputs = z.infer<typeof inputSchema>;

export const NewIncident = ({ onClose }: NewIncidentProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset,
		watch,
	} = useForm<Inputs>({
		resolver: zodResolver(inputSchema),
	});

	const {
		mutateAsync: createIncident,
		error: createIncidentError,
		reset: resetCreate,
	} = useCreateServiceNowIncidents();

	const { mutateAsync: uploadFiles, error: uploadFilesError } = useUploadAttachmentsServiceNowIncidents();

	const [uploadFilesErrors, setUploadFilesErrors] = useState<UploadStatus>();

	const metadata = useIncidentMeta();

	const onSubmit: SubmitHandler<Inputs> = async ({ shortDescription, description, files }) => {
		const incident = await createIncident({ shortDescription, description, metadata });

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

	if (uploadFilesError || uploadFilesErrors) {
		return 'could create incident but files failed to upload';
	}

	return (
		<Style.Wrapper>
			<Typography variant="h5">Report an Error</Typography>
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
						<Button
							onClick={() => {
								reset();
								resetCreate();
							}}
						>
							Reset
						</Button>
						<Button onClick={() => onClose()}>Close</Button>
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
					label="Short Description"
					maxLength={51}
				/>

				<TextField
					{...register('description')}
					id="textfield-description"
					variant={errors.description && 'error'}
					helperText={errors.description?.message}
					label="Short Description"
					inputIcon={errors.description && <Icon data={error_filled} title="Error" />}
					multiline
					rows={5}
				/>

				<FileUpload
					inputProps={{ ...register('files') }}
					files={watch('files')}
					onDrop={(files) => {
						reset({ files });
					}}
					onRemoved={(files) => {
						reset({ files });
					}}
				/>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? <CircularProgress size={16} /> : 'Submit'}
				</Button>
				<Button onClick={() => onClose()}>Cancel</Button>
			</Style.From>
		</Style.Wrapper>
	);
};
