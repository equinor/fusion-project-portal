import { Card, Button, Typography, Autocomplete, Radio } from '@equinor/eds-core-react';

import { zodResolver } from '@hookform/resolvers/zod';

import styled from 'styled-components';

import { useCreatePortal } from '../../hooks/use-portal-query';
import { PortalInputs, portalInputSchema } from '../../schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetContextTypes } from '../../hooks/use-context-type-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { DescriptionInput } from '../FormComponents/DescriptionInput';
import { NameInput } from '../FormComponents/NameIntput';
import { ShortNameInput } from '../FormComponents/ShortNameInput';
import { SubtextInput } from '../FormComponents/SubTextInput';
import { IconInput } from '../FormComponents/IconInput';
import { AddAdmins } from '../FormComponents/AddAdmins';
import { PageMessage } from '../PageMessage/PageMessage';

import { Loading } from '../Loading';
import { useAccess } from '../../access/hooks/useAccess';

const Style = {
	Wrapper: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: column;
	`,
	Heading: styled(Typography)`
		padding: 0.5rem 0;
	`,
	Card: styled(Card)`
		padding: 1rem;
	`,
	Form: styled.form`
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	Row: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1rem;
	`,
	ErrorWrapper: styled.div`
		padding-top: 1rem;
		padding-bottom: 1rem;
	`,
	AdminError: styled(Typography).withConfig({ displayName: 'AdminError' })`
		display: flex;
		gap: 0.5rem;
		align-items: center;
	`,
	AdminList: styled.div`
		padding-top: 1rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
	`,
};

const ICON = `<svg width=\"50\" height=\"35\" viewBox=\"0 0 50 35\" fill=\"none\">\n\t\t\t\t<path\n\t\t\t\t\td=\"M0 2V23.1776L7.05405 16.1235V7.05405H16.1235L23.1776 0H2C0.895431 0 0 0.89543 0 2Z\"\n\t\t\t\t\ttransform=\"translate(50 17.5) scale(0.92727 1.06779) rotate(135)\"\n\t\t\t\t\tfill=\"url(#paint0_linear)\"\n\t\t\t\t></path>\n\t\t\t\t<path\n\t\t\t\t\td=\"M0 2V23.1776L7.05405 16.1235V7.05405H16.1235L23.1776 0H2C0.895431 0 0 0.89543 0 2Z\"\n\t\t\t\t\ttransform=\"translate(0 17.5) scale(0.92727 1.06779) rotate(-45)\"\n\t\t\t\t\tfill=\"url(#paint1_linear)\"\n\t\t\t\t></path>\n\t\t\t\t<path\n\t\t\t\t\td=\"M9.61965 36.6972L2.60087 29.6784L1.96135 22.3809L8.42623 22.9069L9.61965 36.6972Z\"\n\t\t\t\t\ttransform=\"translate(33.8887 34.9863) scale(0.92727 -1.06779) rotate(45)\"\n\t\t\t\t\tfill=\"#990025\"\n\t\t\t\t></path>\n\t\t\t\t<path\n\t\t\t\t\td=\"M7.05434 7.05434L0 0L1.21096 13.8183L7.68846 14.3818L7.05434 7.05434Z\"\n\t\t\t\t\ttransform=\"translate(33.8887 34.9863) scale(0.92727 -1.06779) rotate(45)\"\n\t\t\t\t\tfill=\"#990025\"\n\t\t\t\t></path>\n\t\t\t\t<path\n\t\t\t\t\td=\"M0 0L2.49398 29.5715L9.61965 36.6972L7.01878 7.01878L0 0Z\"\n\t\t\t\t\ttransform=\"translate(33.8887 0.015625) scale(0.92727 1.06779) rotate(45)\"\n\t\t\t\t\tfill=\"#FF1243\"\n\t\t\t\t></path>\n\t\t\t\t<defs>\n\t\t\t\t\t<linearGradient\n\t\t\t\t\t\tid=\"paint0_linear\"\n\t\t\t\t\t\tx2=\"1\"\n\t\t\t\t\t\tgradientUnits=\"userSpaceOnUse\"\n\t\t\t\t\t\tgradientTransform=\"matrix(-13.5478 9.01983 -12.9578 -13.5478 18.0677 6.77391)\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<stop offset=\"0.508287\" stopColor=\"#DC002E\"></stop>\n\t\t\t\t\t\t<stop offset=\"0.508387\" stopColor=\"#FF1243\"></stop>\n\t\t\t\t\t</linearGradient>\n\t\t\t\t\t<linearGradient\n\t\t\t\t\t\tid=\"paint1_linear\"\n\t\t\t\t\t\tx2=\"1\"\n\t\t\t\t\t\tgradientUnits=\"userSpaceOnUse\"\n\t\t\t\t\t\tgradientTransform=\"matrix(-13.5478 9.01983 -12.9578 -13.5478 18.0677 6.77391)\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<stop offset=\"0.508287\" stopColor=\"#DC002E\"></stop>\n\t\t\t\t\t\t<stop offset=\"0.508387\" stopColor=\"#FF1243\"></stop>\n\t\t\t\t\t</linearGradient>\n\t\t\t\t</defs>\n\t\t\t</svg>`;

export const CreatePortalForm = () => {
	const { isCheckingAccess, canPost } = useAccess({ type: 'Portals' });

	const { mutateAsync: createPortal, reset: resetCreate } = useCreatePortal();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
		reset,
		clearErrors,
		watch,
		setValue,
	} = useForm<PortalInputs>({
		resolver: zodResolver(portalInputSchema),
		defaultValues: {
			contextTypes: [],
			admins: [],
			icon: ICON,
		},
	});

	const onSubmit: SubmitHandler<PortalInputs> = async (newPortal) => {
		const portal = await createPortal(newPortal);

		if (portal) {
			reset();
			resetCreate();
		}
	};

	const { data: ContextTypes } = useGetContextTypes();

	const [type, setType] = useState('app-portal');
	const onTypeChange = (event: ChangeEvent<HTMLInputElement>) => setType(event.target.value);

	useEffect(() => {
		type === 'app-portal' && setValue('contextTypes', []);
	}, [type]);

	if (isCheckingAccess) return <Loading detail="Checking Access" />;

	if (!canPost) {
		return (
			<PageMessage type="Warning" title="No Access">
				<Typography>You do not have access to create portals</Typography>
			</PageMessage>
		);
	}

	return (
		<Style.Wrapper>
			<Style.Form onSubmit={handleSubmit(onSubmit)} id="create">
				<Style.Card>
					<Typography variant="h5">General</Typography>
					<NameInput register={register} errors={errors} canEdit={canPost} />
					<Style.Row>
						<ShortNameInput register={register} errors={errors} canEdit={canPost} />
						<SubtextInput register={register} errors={errors} canEdit={canPost} />
					</Style.Row>
					<DescriptionInput register={register} errors={errors} canEdit={canPost} />
				</Style.Card>
				<Style.Card>
					<Style.Heading variant="h5">Admins</Style.Heading>
					<AddAdmins watch={watch} setValue={setValue} errors={errors} canEdit={canPost} />
				</Style.Card>
				<Style.Card>
					<Typography variant="h5">Icon</Typography>
					<IconInput register={register} errors={errors} icon={watch().icon} canEdit={canPost} />
				</Style.Card>
				<Style.Card>
					<Typography variant="h5">Portal Type</Typography>
					<Typography>
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
							options={ContextTypes?.map((ct) => ct.type) || []}
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
				<Style.Card>
					<Typography variant="overline">Create Portal Actions</Typography>
					<Style.Row>
						<Button type="submit" disabled={!isValid || isSubmitting} form="create">
							Create Portal
						</Button>
						<Button
							variant="outlined"
							onClick={() => {
								resetCreate();
								reset();
								clearErrors();
							}}
						>
							Clear From
						</Button>
					</Style.Row>
				</Style.Card>
			</Style.Form>
		</Style.Wrapper>
	);
};
