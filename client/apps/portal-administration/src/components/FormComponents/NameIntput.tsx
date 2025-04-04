import { Icon, TextField } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PortalInputs } from '../../schema';

type NameInputProps = {
	register: UseFormRegister<PortalInputs>;
	errors: FieldErrors<{
		name?: string | undefined;
	}>;
	canEdit?: boolean;
};

export const NameInput = ({ register, errors, canEdit }: NameInputProps) => {
	return (
		<TextField
			{...register('name')}
			id="textfield-name"
			readOnly={!canEdit}
			variant={errors.name && 'error'}
			helperText={errors.name?.message}
			inputIcon={errors.name && <Icon data={error_filled} title="Error" />}
			maxLength={51}
			label="Portal Name *"
		/>
	);
};
