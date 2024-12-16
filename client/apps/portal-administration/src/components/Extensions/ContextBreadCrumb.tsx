import { TextField, Icon, Autocomplete, Button, Checkbox, Typography } from '@equinor/eds-core-react';
import { error_filled, clear } from '@equinor/eds-icons';
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch, useFieldArray } from 'react-hook-form';

import { ExtensionsConfig } from '../../schema/extensions';
import { styled } from 'styled-components';
import { useEffect, useMemo } from 'react';
import { i } from 'vite/dist/node/types.d-aGj9QkWt';

const Style = {
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
	Heading: styled(Typography)`
		padding: 0.5rem 0;
	`,
};

export const ContextBreadCrumb = ({
	register,
	control,
	errors,
	selectedContextTypes,
	setValue,
	portalContexts,
	watch,
	canEdit,
}: {
	register: UseFormRegister<ExtensionsConfig>;
	control: Control<ExtensionsConfig>;
	errors: FieldErrors<ExtensionsConfig>;
	selectedContextTypes: string[];
	portalContexts: { type: string }[];
	setValue: UseFormSetValue<ExtensionsConfig>;
	watch: UseFormWatch<ExtensionsConfig>;
	canEdit?: boolean;
}) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'breadCrumbsConfiguration.config.context' as never,
	});

	const isActive = useMemo(
		() => watch().breadCrumbsConfiguration.enabled,
		[watch().breadCrumbsConfiguration.enabled]
	);

	useEffect(() => {
		if (!isActive) {
			remove();
		}
	}, [isActive, remove]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Style.RowSpaceBetween>
				<Style.Heading variant="h5">Bread Crumbs Configuration</Style.Heading>
				<Checkbox label="Activate" {...register('breadCrumbsConfiguration.enabled')} disabled={!canEdit} />
			</Style.RowSpaceBetween>
			<Typography style={{ width: '350px' }}>
				Context bread crumbs are based on the context types selected in the portal. The context types are
				selected in the portal overview section.
			</Typography>
			<Style.RowSpaceBetween>
				<Style.Heading variant="h6">Context Bread Crumb</Style.Heading>
			</Style.RowSpaceBetween>
			<div>
				{fields?.map((item, index) => {
					return (
						<Style.Row key={item.id}>
							<TextField
								label="Label"
								id={`label-${index}-${item.id}`}
								variant={errors.breadCrumbsConfiguration?.config?.context?.[index]?.label && 'error'}
								helperText={errors.breadCrumbsConfiguration?.config?.context?.[index]?.label?.message}
								inputIcon={
									errors.breadCrumbsConfiguration?.config?.context?.[index]?.label && (
										<Icon data={error_filled} title="Error" />
									)
								}
								{...register(`breadCrumbsConfiguration.config.context.${index}.label` as const)}
							/>
							<TextField
								label="Url"
								id={`url-${index}-${item.id}`}
								variant={errors.breadCrumbsConfiguration?.config?.context?.[index]?.url && 'error'}
								helperText={errors.breadCrumbsConfiguration?.config?.context?.[index]?.url?.message}
								inputIcon={
									errors.breadCrumbsConfiguration?.config?.context?.[index]?.url && (
										<Icon data={error_filled} title="Error" />
									)
								}
								{...register(`breadCrumbsConfiguration.config.context.${index}.url` as const)}
							/>

							<Autocomplete
								style={{ width: '100%' }}
								id={`type-${index}-${item.id}`}
								variant={errors.breadCrumbsConfiguration?.config?.context?.[index]?.type && 'error'}
								helperText={
									errors.breadCrumbsConfiguration?.config?.context?.[index]?.type &&
									'Select a context type'
								}
								options={
									portalContexts
										.filter((c) => !selectedContextTypes.includes(c.type))
										?.map((ct) => ct.type) || []
								}
								onOptionsChange={({ selectedItems }) => {
									setValue(
										`breadCrumbsConfiguration.config.context.${index}.type`,
										selectedItems[0],
										{
											shouldTouch: true,
											shouldValidate: true,
										}
									);
								}}
								initialSelectedOptions={[
									watch().breadCrumbsConfiguration?.config?.context?.[index]?.type || '',
								]}
								label="Context Type"
							/>

							<Button
								style={{ marginTop: '1rem', width: '140px' }}
								variant="ghost_icon"
								onClick={() => {
									remove(index);
								}}
							>
								<Icon data={clear} />
							</Button>
						</Style.Row>
					);
				})}
			</div>
			<Button
				fullWidth
				variant="outlined"
				disabled={selectedContextTypes.length >= portalContexts.length || !isActive}
				onClick={() => {
					append({ label: '', type: '', url: '' });
				}}
			>
				Add Context Bread Crumb
			</Button>
		</div>
	);
};
