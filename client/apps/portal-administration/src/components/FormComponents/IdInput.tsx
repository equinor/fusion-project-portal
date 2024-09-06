import { Icon, TextField } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PortalInputs } from '../../schema';

type IdInputProps = {
	register: UseFormRegister<PortalInputs>;
	errors: FieldErrors<{
		id?: string | undefined;
	}>;
};

export const IdInput = ({ register, errors }: IdInputProps) => {
	return (
		<TextField
			readOnly
			{...register('id')}
			id="textfield-id"
			variant={errors.id && 'error'}
			helperText={errors.id?.message}
			inputIcon={errors.id && <Icon data={error_filled} title="Error" />}
			label="Portal ID"
			maxLength={500}
		/>
	);
};
