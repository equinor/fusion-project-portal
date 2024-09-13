import { Card, Typography, Autocomplete, Radio } from '@equinor/eds-core-react';

import { zodResolver } from '@hookform/resolvers/zod';

import styled from 'styled-components';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useUpdatePortal } from '../../hooks/use-portal-query';
import { PortalInputs, portalEditInputSchema } from '../../schema';
import { ContextType, Portal } from '../../types';
import { DescriptionInput } from '../FormComponents/DescriptionInput';

import { FormActionBar } from './FormActionBar';
import { IdInput } from '../FormComponents/IdInput';
import { NameInput } from '../FormComponents/NameIntput';
import { ShortNameInput } from '../FormComponents/ShortNameInput';
import { SubtextInput } from '../FormComponents/SubTextInput';
import { IconInput } from '../FormComponents/IconInput';

const Style = {
	Wrapper: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: column;
		padding-bottom: 2rem;
	`,
	Row: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: row;
	`,
	Card: styled(Card)`
		padding: 1rem;
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

	ActionBar: styled.div`
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	`,
};

export const EditPortalForm = (props: {
	portal: Portal;
	contextTypes: ContextType[];
	isSideSheet?: boolean;
	onDisabled?: (isDisabled: boolean) => void;
}) => {
	const { id, contexts } = props.portal;
	const { mutateAsync: updatePortal } = useUpdatePortal(id);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, touchedFields },
		watch,
		setValue,
	} = useForm<PortalInputs>({
		resolver: zodResolver(portalEditInputSchema),
		defaultValues: {
			...props.portal,
		},
	});

	const onSubmit: SubmitHandler<PortalInputs> = async (editedPortal) => {
		await updatePortal(editedPortal);
	};

	const [type, setType] = useState(contexts && contexts?.length > 0 ? 'context-portal' : 'app-portal');
	const onTypeChange = (event: ChangeEvent<HTMLInputElement>) => setType(event.target.value);

	useEffect(() => {
		type === 'app-portal' && setValue('contextTypes', []);
	}, [type]);

	const onDisabled = props.onDisabled;

	const disabled = Object.keys(touchedFields).length <= 0;

	useEffect(() => {
		onDisabled && onDisabled(disabled);
	}, [disabled, onDisabled]);

	return (
		<Style.Wrapper>
			<Style.Card>
				<Style.Heading variant="h5">General</Style.Heading>
				<Style.From onSubmit={handleSubmit(onSubmit)} id="portal">
					<IdInput register={register} errors={errors} />
					<NameInput register={register} errors={errors} />
					<Style.Row>
						<ShortNameInput register={register} errors={errors} />
						<SubtextInput register={register} errors={errors} />
					</Style.Row>
					<DescriptionInput register={register} errors={errors} />
				</Style.From>
			</Style.Card>
			<Style.Card>
				<Typography variant="h5">Icon</Typography>
				<IconInput register={register} errors={errors} icon={watch().icon} />
			</Style.Card>
			<Style.Card>
				<Typography variant="h5">Portal Type</Typography>
				<Typography variant="caption">
					Selection context portal makes the portal context-driven, allowing you to select one or more
					supported context types for the portal to support.
				</Typography>
				<Style.Row>
					<Radio
						label="App Portal"
						value="app-portal"
						checked={type === 'app-portal'}
						onChange={onTypeChange}
					/>
					<Radio
						label="Context Portal"
						value="context-portal"
						checked={type === 'context-portal'}
						onChange={onTypeChange}
					/>
				</Style.Row>
			</Style.Card>

			{type === 'context-portal' && (
				<Style.Card>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant="h5">Context</Typography>
					</div>

					<Autocomplete
						id="textfield-context-types"
						multiple
						variant={errors.contextTypes && 'error'}
						helperText={errors.contextTypes?.message}
						options={props.contextTypes?.map((ct) => ct.type) || []}
						selectedOptions={watch().contextTypes}
						onOptionsChange={({ selectedItems }) => {
							setValue('contextTypes', selectedItems);
						}}
						itemCompare={(item, compare) => {
							return item === compare;
						}}
						label="Context Types"
					/>
				</Style.Card>
			)}
			{!props.isSideSheet && (
				<Style.Card>
					<Typography variant="overline">Portal Actions</Typography>
					<Style.Row>
						<FormActionBar isDisabled={isSubmitting || disabled} portal={props.portal} />
					</Style.Row>
				</Style.Card>
			)}
		</Style.Wrapper>
	);
};
