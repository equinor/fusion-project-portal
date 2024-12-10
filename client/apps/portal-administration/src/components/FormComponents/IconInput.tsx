import { Label, Icon, TextField } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PortalInputs } from '../../schema';
import styled from 'styled-components';
import * as AllIcons from '@equinor/eds-icons';

const Style = {
	Row: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: row;
	`,
	IconWrapper: styled.div`
		background: #00707920;
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1 / 1;
		width: 132px;
	`,
	Icon: styled.span`
		> svg {
			width: 100px;
		}
	`,
};

type IconInputProps = {
	register: UseFormRegister<PortalInputs>;
	errors: FieldErrors<{
		icon?: string | undefined;
	}>;
	icon: string;
	canEdit?: boolean;
};

export const IconInput = ({ register, errors, icon, canEdit }: IconInputProps) => {
	return (
		<Style.Row>
			<div>
				<Label label="Icon Preview" htmlFor="icon-preview" />
				<Style.IconWrapper id="icon-preview">
					{icon && Object.keys(AllIcons).includes(icon) ? (
						<Icon name={icon} size={48} />
					) : (
						<Style.Icon
							dangerouslySetInnerHTML={{
								__html: icon.replace(/\s+/g, ' ').trim(),
							}}
						/>
					)}
				</Style.IconWrapper>
			</div>
			<TextField
				rows={5}
				multiline
				readOnly={!canEdit}
				{...register('icon')}
				id="textfield-icon"
				variant={errors.icon && 'error'}
				helperText={errors.icon?.message}
				inputIcon={errors.icon && <Icon data={error_filled} title="Error" />}
				label="Icon"
			/>
		</Style.Row>
	);
};
