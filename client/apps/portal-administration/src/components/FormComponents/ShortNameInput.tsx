import { Icon, TextField } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PortalInputs } from '../../schema';

type ShortNameInputProps = {
	register: UseFormRegister<PortalInputs>;
	errors: FieldErrors<{
		shortName?: string | undefined;
	}>;
};

export const ShortNameInput = ({ register, errors }: ShortNameInputProps) => {
	return (
		<TextField
			{...register('shortName')}
			id="textfield-short-name"
			variant={errors.shortName && 'error'}
			helperText={errors.shortName?.message}
			inputIcon={errors.shortName && <Icon data={error_filled} title="Error" />}
			maxLength={15}
			label="Short Name *"
		/>
	);
};
