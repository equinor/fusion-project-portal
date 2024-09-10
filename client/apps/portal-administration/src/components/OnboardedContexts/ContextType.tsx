import { Button, Icon, Typography, TextField, Card } from '@equinor/eds-core-react';

import { zodResolver } from '@hookform/resolvers/zod';

import styled from 'styled-components';

import { ContextTypeInputs, contextTypeSchema } from '../../schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { error_filled } from '@equinor/eds-icons';
import { useCreateContextType, useGetContextTypes, useRemoveContextType } from '../../hooks/use-context-type-query';
import { Message } from '../Message';
import { tokens } from '@equinor/eds-tokens';

const Style = {
	Content: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	Card: styled(Card)<{ background?: string }>`
		padding: 1rem;
		background-color: ${({ background }) => background};
	`,
	From: styled.form`
		padding-top: 1rem;
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	ErrorWrapper: styled.div`
		padding-top: 1rem;
		padding-bottom: 1rem;
	`,
	Heading: styled(Typography)`
		padding: 0.5rem 0;
	`,
};

export const EditContextTypeForm = () => {
	const { mutateAsync: createContextType, reset: resetCreate } = useCreateContextType();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
	} = useForm<ContextTypeInputs>({
		resolver: zodResolver(contextTypeSchema),
	});

	const onSubmit: SubmitHandler<ContextTypeInputs> = async (newContextType) => {
		const contextType = await createContextType(newContextType);

		if (contextType) {
			reset();
			resetCreate();
		}
	};

	const { data: contextTypes } = useGetContextTypes();
	const { mutateAsync: removeContextType } = useRemoveContextType();

	return (
		<Style.Content>
			<Style.Card background={tokens.colors.ui.background__info.hex}>
				<Message
					title="Context Types"
					messages={[
						'If the desired context type is not available, you can add it here.',
						'Please note that only valid fusion context types are permitted.',
					]}
				/>
			</Style.Card>
			<Style.Card>
				<Style.From onSubmit={handleSubmit(onSubmit)} id="context-type-form">
					<TextField
						{...register('type')}
						id="textfield-context-type"
						variant={errors.type && 'error'}
						helperText={errors.type?.message}
						inputIcon={errors.type && <Icon data={error_filled} title="Error" />}
						label="Type *"
						maxLength={31}
					/>
					<Button form="context-type-form" type="submit" disabled={isSubmitting}>
						Add
					</Button>
					<Button
						onClick={() => removeContextType(watch('type'))}
						disabled={!Boolean(contextTypes?.find((c) => c.type === watch('type')))}
					>
						Remove
					</Button>

					{contextTypes?.map((t) => (
						<div key={t.type}>{t.type}</div>
					))}
				</Style.From>
			</Style.Card>
		</Style.Content>
	);
};
