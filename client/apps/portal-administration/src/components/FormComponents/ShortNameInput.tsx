import { Icon, TextField } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PortalInputs } from '../../schema';

type ShortNameInputProps = {
	register: UseFormRegister<PortalInputs>;
	errors: FieldErrors<{
		shortName?: string | undefined;
	}>;
	canEdit?: boolean;
};

export const ShortNameInput = ({ register, errors, canEdit }: ShortNameInputProps) => {
	return (
		<TextField
			{...register('shortName')}
			id="textfield-short-name"
			readOnly={!canEdit}
			variant={errors.shortName && 'error'}
			helperText={errors.shortName?.message}
			inputIcon={errors.shortName && <Icon data={error_filled} title="Error" />}
			maxLength={15}
			label="Short Name *"
		/>
	);
};
