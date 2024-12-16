import { Card, Typography, Checkbox } from '@equinor/eds-core-react';
import { zodResolver } from '@hookform/resolvers/zod';

import styled from 'styled-components';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ContextType, Portal } from '../../types';

import { useCurrentAccount } from '@equinor/fusion-framework-react-app/msal';
import { useAccess } from '../../hooks/use-access';
import { ExtensionsConfig, extensionsConfig } from '../../schema/extensions';
import { FormActionBar } from './FormActionBar';
import { ContextBreadCrumb } from './ContextBreadCrumb';

import { MenuConfig } from './Menu';
import { BookmarkConfig } from './BookmarkConfig';

const Style = {
	Wrapper: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: column;
		padding-bottom: 2rem;
		width: 100%;
		max-width: 800px;
	`,

	Row: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding-bottom: 1rem;
	`,
	RowSpaceBetween: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
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

export const ExtensionConfigForm = (props: {
	portal: Portal;
	contextTypes: ContextType[];
	onDisabled?: (isDisabled: boolean) => void;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, touchedFields },
		watch,
		setValue,
		control,
	} = useForm<ExtensionsConfig>({
		resolver: zodResolver(extensionsConfig),
		defaultValues: {
			breadCrumbsConfiguration: {
				enabled: true,
				config: {
					context: [
						{
							label: 'Project',
							type: 'ProjectMaster',
							url: '/project/:contextId',
						},
						{
							label: 'Project',
							type: 'Facility',
							url: '/project/:contextId',
						},
					],
				},
			},
			quickNavigation: {
				enabled: true,
				config: {
					links: [
						{
							label: 'Home',
							url: '/',
						},
						{
							label: 'Projects',
							url: '/projects',
						},
					],
				},
			},
		},
	});

	const onSubmit: SubmitHandler<ExtensionsConfig> = async (editedConfig) => {
		console.log(editedConfig);
		// await updatePortal(editedPortal);
	};

	const onDisabled = props.onDisabled;

	const disabled = Object.keys(touchedFields).length <= 0;

	useEffect(() => {
		onDisabled && onDisabled(disabled);
	}, [disabled, onDisabled]);

	const { data: isAdmin } = useAccess();

	const account = useCurrentAccount();
	const canEdit = true;
	// const canEdit = useMemo(
	// 	() => watch().admins?.some((admin) => admin.azureUniqueId === account?.localAccountId) || isAdmin,
	// 	[watch().admins, account, isAdmin]
	// );

	const selectedContextTypes = watch().breadCrumbsConfiguration?.config?.context.map((c) => c.type) || [];
	return (
		<Style.Wrapper>
			<Style.From onSubmit={handleSubmit(onSubmit)} id="extensions">
				<Style.Card>
					<MenuConfig
						watch={watch}
						setValue={setValue}
						errors={errors}
						control={control}
						register={register}
						canEdit={canEdit}
					/>
				</Style.Card>

				<Style.Card>
					<Style.RowSpaceBetween>
						<Style.Heading variant="h5">Service Message</Style.Heading>
						<Checkbox label="Activate" {...register('serviceMessage.enabled')} disabled={!canEdit} />
					</Style.RowSpaceBetween>
				</Style.Card>
				<Style.Card>
					<BookmarkConfig
						register={register}
						errors={errors}
						canEdit={canEdit}
						watch={watch}
						portal={props.portal}
						setValue={setValue}
					/>
				</Style.Card>
				<Style.Card>
					<Style.RowSpaceBetween>
						<Style.Heading variant="h5">Task</Style.Heading>
						<Checkbox label="Activate" {...register('task.enabled')} disabled={!canEdit} />
					</Style.RowSpaceBetween>
				</Style.Card>
				<Style.Card>
					<Style.RowSpaceBetween>
						<Style.Heading variant="h5">Services@Equinor</Style.Heading>
						<Checkbox label="Activate" {...register('task.enabled')} disabled={!canEdit} />
					</Style.RowSpaceBetween>
				</Style.Card>
				<Style.Card>
					<Style.RowSpaceBetween>
						<Style.Heading variant="h5">Notifications</Style.Heading>
						<Checkbox label="Activate" {...register('task.enabled')} disabled={!canEdit} />
					</Style.RowSpaceBetween>
				</Style.Card>
				<Style.Card>
					<Style.RowSpaceBetween>
						<Style.Heading variant="h5">My Account</Style.Heading>
						<Checkbox label="Activate" {...register('task.enabled')} disabled={!canEdit} />
					</Style.RowSpaceBetween>
				</Style.Card>
				<Style.Card>
					<ContextBreadCrumb
						watch={watch}
						setValue={setValue}
						errors={errors}
						control={control}
						register={register}
						portalContexts={props.portal.contexts}
						selectedContextTypes={selectedContextTypes}
						canEdit={canEdit}
					/>
				</Style.Card>
			</Style.From>

			<Style.Card>
				<Typography variant="overline">Extensions Actions</Typography>
				<Style.Row>
					<FormActionBar isDisabled={isSubmitting || disabled} />
				</Style.Row>
			</Style.Card>
		</Style.Wrapper>
	);
};
