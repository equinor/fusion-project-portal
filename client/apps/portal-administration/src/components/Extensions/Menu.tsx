import { TextField, Icon, Autocomplete, Button, Checkbox, Typography } from '@equinor/eds-core-react';
import { error_filled, clear } from '@equinor/eds-icons';
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch, useFieldArray } from 'react-hook-form';

import { ExtensionsConfig, menuTypes } from '../../schema/extensions';
import { styled } from 'styled-components';
import { useEffect } from 'react';

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

export const MenuConfig = ({
	register,
	errors,
	setValue,
	watch,
	canEdit,
}: {
	register: UseFormRegister<ExtensionsConfig>;
	control: Control<ExtensionsConfig>;
	errors: FieldErrors<ExtensionsConfig>;
	isActive?: boolean;
	setValue: UseFormSetValue<ExtensionsConfig>;
	watch: UseFormWatch<ExtensionsConfig>;
	canEdit?: boolean;
}) => {
	const isActive = watch().menu?.enabled;

	useEffect(() => {
		if (!isActive) {
			setValue('menu.config', undefined);
		}
	}, [isActive, setValue]);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1rem' }}>
			<Style.RowSpaceBetween>
				<Style.Heading variant="h5">Menu</Style.Heading>
				<Checkbox label="Activate" {...register('menu.enabled')} disabled={!canEdit} />
			</Style.RowSpaceBetween>
			<Typography style={{ width: '350px' }}>
				{isActive
					? 'The Menu is active and will be displayed in the portal. You can configure the menu type and if the menu is a custom widget, you must provide the widget id.'
					: 'The Menu is inactive and will not be displayed in the portal.'}
			</Typography>
			<Style.RowSpaceBetween>
				<Autocomplete
					style={{ width: '100%' }}
					id={`menu-type`}
					disabled={watch().menu?.enabled === false}
					variant={errors.menu?.config?.type && 'error'}
					helperText={errors.menu?.config?.type && 'Select a Menu Type'}
					options={menuTypes}
					onOptionsChange={({ selectedItems }) => {
						const selected = selectedItems[0];
						if (selected) {
							setValue(`menu.config.type`, selected, {
								shouldTouch: true,
								shouldValidate: true,
							});
						}
					}}
					initialSelectedOptions={[watch().menu?.config?.type]}
					label="Menu Type"
				/>
				<TextField
					label="WidgetId"
					disabled={watch().menu?.config?.type !== 'Custom' || !isActive}
					id={`menu-widgetId`}
					variant={errors.menu?.config?.widgetId && 'error'}
					helperText={errors.menu?.config?.widgetId?.message}
					inputIcon={errors.menu?.config?.widgetId && <Icon data={error_filled} title="Error" />}
					{...register(`menu.config.widgetId` as const)}
				/>
			</Style.RowSpaceBetween>
		</div>
	);
};
