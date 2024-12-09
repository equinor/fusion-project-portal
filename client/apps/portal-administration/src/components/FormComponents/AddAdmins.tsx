import { Label, Icon, Button, Typography } from '@equinor/eds-core-react';
import { PersonSelect, PersonListItem, PersonSelectEvent } from '@equinor/fusion-react-person';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import styled from 'styled-components';
import { error_filled, close } from '@equinor/eds-icons';
import { PortalInputs } from '../../schema';

const Style = {
	AdminError: styled(Typography).withConfig({ displayName: 'AdminError' })`
		display: flex;
		gap: 0.5rem;
		align-items: center;
	`,
	AdminList: styled.div`
		padding-top: 1rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
	`,
};

export const AddAdmins = ({
	watch,
	setValue,
	errors,
	canEdit,
}: {
	watch: UseFormWatch<PortalInputs>;
	setValue: UseFormSetValue<PortalInputs>;
	errors: FieldErrors<PortalInputs>;
	canEdit?: boolean;
}) => {
	const handlePersonSelect = (e: PersonSelectEvent) => {
		const selected = e.nativeEvent.detail.selected?.azureId;
		if (!selected) return;
		const current = watch().admins;
		const selectedItems = [...current, { azureUniqueId: selected }];
		setValue('admins', selectedItems, { shouldTouch: true, shouldValidate: true });
	};

	const handlePersonRemove = (azureUniqueId: string) => {
		setValue(
			'admins',
			watch().admins.filter((a) => a.azureUniqueId !== azureUniqueId),
			{ shouldTouch: true }
		);
	};

	const handleOnBlur = () => {
		setValue('admins', watch().admins, { shouldTouch: true });
	};

	return (
		<>
			{canEdit && (
				<div>
					<Label htmlFor="#person-select" label={'Search for Portal Admins'}></Label>
					<PersonSelect
						id="person-select"
						variant="page-dense"
						selectedPerson={null}
						onBlur={handleOnBlur}
						onSelect={handlePersonSelect}
						placeholder="Search.."
					/>
				</div>
			)}
			<Style.AdminList>
				{errors.admins && (
					<Style.AdminError variant="caption" color="danger">
						{errors.admins.message}
						<Icon data={error_filled} title="Error" />
					</Style.AdminError>
				)}
				{watch().admins.map((person) => (
					<PersonListItem key={person.azureUniqueId} azureId={person.azureUniqueId}>
						{canEdit && (
							<Button
								variant="ghost_icon"
								onClick={() => {
									handlePersonRemove(person.azureUniqueId);
								}}
							>
								<Icon data={close} title={`Remove admin`} />
							</Button>
						)}
					</PersonListItem>
				))}
			</Style.AdminList>
		</>
	);
};
