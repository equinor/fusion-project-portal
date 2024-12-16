import { Typography, Checkbox, TextField, Icon } from '@equinor/eds-core-react';
import { UseFormRegister, Control, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import styled from 'styled-components';
import { ExtensionsConfig } from '../../schema/extensions';
import { error_filled } from '@equinor/eds-icons';
import { useEffect } from 'react';
import { Portal } from '../../types';

const Style = {
	Wrapper: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: column;
		padding-bottom: 2rem;
		width: 100%;
		max-width: 800px;
	`,
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
	Col: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
};

type BookmarkConfigProps = {
	register: UseFormRegister<ExtensionsConfig>;
	watch: UseFormWatch<ExtensionsConfig>;
	setValue: UseFormSetValue<ExtensionsConfig>;
	errors: FieldErrors<ExtensionsConfig>;
	canEdit?: boolean;
	portal: Portal;
};

export const BookmarkConfig = ({ register, errors, canEdit, watch, portal, setValue }: BookmarkConfigProps) => {
	const isActive = watch().bookmarks?.enabled;

	const subSystem = watch().bookmarks?.config?.subSystem;

	useEffect(() => {
		if (!subSystem) {
			setValue('bookmarks.config.subSystem', {
				identifier: portal.id,
				name: portal.name,
				subSystem: portal.shortName,
			});
		}
	}, [portal, subSystem, setValue]);

	return (
		<Style.Wrapper>
			<Style.RowSpaceBetween>
				<Style.Heading variant="h5">Bookmarks</Style.Heading>
				<Checkbox label="Activate" {...register('bookmarks.enabled')} disabled={!canEdit} />
			</Style.RowSpaceBetween>
			<Style.RowSpaceBetween>
				<Checkbox
					label="Filter By applications"
					{...register('bookmarks.config.filterByApp')}
					disabled={!canEdit}
				/>
				<Typography style={{ width: '400px' }}>
					By enabling this option, the bookmarks will be filtered by the application that is active and
					bookmarks will only be shown when the application has been selected
				</Typography>
			</Style.RowSpaceBetween>
			<Style.RowSpaceBetween>
				<Style.Heading variant="h6">Sub System</Style.Heading>
			</Style.RowSpaceBetween>
			<Style.Col>
				<TextField
					label="Identifier"
					id={`bookmark-Identifier`}
					variant={errors.bookmarks?.config?.subSystem?.identifier && 'error'}
					helperText={errors.bookmarks?.config?.subSystem?.identifier?.message}
					inputIcon={
						errors.bookmarks?.config?.subSystem?.identifier && <Icon data={error_filled} title="Error" />
					}
					{...register(`bookmarks.config.subSystem.identifier` as const)}
				/>
				<TextField
					label="name"
					id={`bookmark-Identifier`}
					variant={errors.bookmarks?.config?.subSystem?.name && 'error'}
					helperText={errors.bookmarks?.config?.subSystem?.name?.message}
					inputIcon={errors.bookmarks?.config?.subSystem?.name && <Icon data={error_filled} title="Error" />}
					{...register(`bookmarks.config.subSystem.name` as const)}
				/>
				<TextField
					label="Sub System"
					id={`bookmark-Identifier`}
					variant={errors.bookmarks?.config?.subSystem?.subSystem && 'error'}
					helperText={errors.bookmarks?.config?.subSystem?.subSystem?.message}
					inputIcon={
						errors.bookmarks?.config?.subSystem?.subSystem && <Icon data={error_filled} title="Error" />
					}
					{...register(`bookmarks.config.subSystem.subSystem` as const)}
				/>
			</Style.Col>
		</Style.Wrapper>
	);
};
