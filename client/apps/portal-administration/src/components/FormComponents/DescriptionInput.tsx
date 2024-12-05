import { Icon, TextField } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PortalInputs } from '../../schema';

type DescriptionInputProps = {
	register: UseFormRegister<PortalInputs>;
	errors: FieldErrors<{
		description?: string | undefined;
	}>;
	canEdit?: boolean;
};

export const DescriptionInput = ({ register, errors, canEdit }: DescriptionInputProps) => {
	return (
		<TextField
			rows={3}
			multiline
			{...register('description')}
			id="textfield-description"
			variant={errors.description && 'error'}
			helperText={errors.description?.message}
			inputIcon={errors.description && <Icon data={error_filled} title="Error" />}
			label="Description"
			maxLength={500}
			readOnly={!canEdit}
		/>
	);
};
