import { Button, Icon, Typography, TextField, Card } from '@equinor/eds-core-react';

import { zodResolver } from '@hookform/resolvers/zod';

import styled from 'styled-components';

import { ContextTypeInputs, contextTypeSchema } from '../../schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { chevron_down, chevron_left, error_filled } from '@equinor/eds-icons';
import { useCreateContextType, useGetContextTypes } from '../../hooks/use-context-type-query';

import { ContextTypeTable } from './ContextTypeTable';
import { InfoPopover } from '../InfoPopover';
import { useState } from 'react';
import { useAccess } from '../../hooks/use-access';

const Style = {
	Content: styled.div`
		display: flex;
		flex-direction: column;

		height: 100%;
	`,
	Card: styled(Card)<{ background?: string }>`
		padding: 0.5rem 1rem;
		background-color: ${({ background }) => background};
	`,
	From: styled.form`
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
	Row: styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
	RowHead: styled.div`
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
};

export const EditContextTypeForm = () => {
	const { mutateAsync: createContextType, reset: resetCreate } = useCreateContextType();
	const { data: isAdmin } = useAccess();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
		reset,
	} = useForm<ContextTypeInputs>({
		resolver: zodResolver(contextTypeSchema),
	});

	const [active, setActive] = useState<boolean>(false);

	const onSubmit: SubmitHandler<ContextTypeInputs> = async (newContextType) => {
		const contextType = await createContextType(newContextType);

		if (contextType) {
			reset();
			resetCreate();
		}
	};

	const { data: contextTypes } = useGetContextTypes();

	return (
		<Style.Content>
			{isAdmin && (
				<Style.Card>
					<Style.Row onClick={() => setActive((s) => !s)}>
						<Style.Row>
							<Typography variant="h6">Add Context Type</Typography>
							<InfoPopover title="Add Context Type">
								<Typography>
									Expand the form to add new context type by pressing the chevron icon.
								</Typography>
							</InfoPopover>
						</Style.Row>
						<Button
							variant="ghost_icon"
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();
								setActive((s) => !s);
							}}
						>
							<Icon data={active ? chevron_down : chevron_left} />
						</Button>
					</Style.Row>
					{active && (
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
							<Button form="context-type-form" type="submit" disabled={isSubmitting || !isValid}>
								Add
							</Button>
						</Style.From>
					)}
				</Style.Card>
			)}
			{contextTypes?.length && <ContextTypeTable contextTypes={contextTypes} isAdmin={isAdmin} />}
		</Style.Content>
	);
};
