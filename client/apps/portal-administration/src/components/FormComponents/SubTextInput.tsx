import { Icon, TextField } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PortalInputs } from '../../schema';

type SubtextInputProps = {
	register: UseFormRegister<PortalInputs>;
	errors: FieldErrors<{
		subtext?: string | undefined;
	}>;
};

export const SubtextInput = ({ register, errors }: SubtextInputProps) => {
	return (
		<TextField
			{...register('subtext')}
			id="textfield-subtext"
			variant={errors.subtext && 'error'}
			helperText={errors.subtext?.message}
			inputIcon={errors.subtext && <Icon data={error_filled} title="Error" />}
			maxLength={50}
			label="Subtext *"
		/>
	);
};
