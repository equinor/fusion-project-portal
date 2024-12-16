import { TextField, Icon, Autocomplete, Button } from '@equinor/eds-core-react';
import { error_filled, clear } from '@equinor/eds-icons';
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch, useFieldArray } from 'react-hook-form';

import { ExtensionsConfig } from '../../schema/extensions';
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
};

export const QuickNavigation = ({
	register,
	control,
	errors,
	isActive,
}: {
	register: UseFormRegister<ExtensionsConfig>;
	control: Control<ExtensionsConfig>;
	errors: FieldErrors<ExtensionsConfig>;
	isActive?: boolean;
}) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'quickNavigation.config.links' as never,
	});

	useEffect(() => {
		if (!isActive) {
			remove();
		}
	}, [isActive, remove]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div>
				{fields?.map((item, index) => {
					return (
						<Style.Row key={item.id}>
							<TextField
								label="Label"
								id={`label-${index}-${item.id}`}
								variant={errors.quickNavigation?.config?.links?.[index]?.label && 'error'}
								helperText={errors.quickNavigation?.config?.links?.[index]?.label?.message}
								inputIcon={
									errors.quickNavigation?.config?.links?.[index]?.label && (
										<Icon data={error_filled} title="Error" />
									)
								}
								{...register(`quickNavigation.config.links.${index}.label` as const)}
							/>
							<TextField
								label="Url"
								id={`url-${index}-${item.id}`}
								variant={errors.quickNavigation?.config?.links?.[index]?.url && 'error'}
								helperText={errors.quickNavigation?.config?.links?.[index]?.url?.message}
								inputIcon={
									errors.quickNavigation?.config?.links?.[index]?.url && (
										<Icon data={error_filled} title="Error" />
									)
								}
								{...register(`quickNavigation.config.links.${index}.url` as const)}
							/>
							<TextField
								label="Icon"
								id={`icon-${index}-${item.id}`}
								variant={errors.quickNavigation?.config?.links?.[index]?.icon && 'error'}
								helperText={errors.quickNavigation?.config?.links?.[index]?.icon?.message}
								inputIcon={
									errors.quickNavigation?.config?.links?.[index]?.icon && (
										<Icon data={error_filled} title="Error" />
									)
								}
								{...register(`quickNavigation.config.links.${index}.icon` as const)}
							/>

							<Button
								style={{ marginTop: '1rem', width: '140px' }}
								variant="ghost_icon"
								onClick={() => {
									remove(index);
								}}
							>
								<Icon data={clear} />
							</Button>
						</Style.Row>
					);
				})}
			</div>
			<Button
				fullWidth
				disabled={!isActive}
				variant="outlined"
				onClick={() => {
					append({ label: '', icon: '', url: '' });
				}}
			>
				Add Link
			</Button>
		</div>
	);
};
