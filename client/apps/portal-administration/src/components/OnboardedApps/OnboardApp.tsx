import { Card, Button, Typography, Autocomplete, Icon } from '@equinor/eds-core-react';

import { zodResolver } from '@hookform/resolvers/zod';

import styled from 'styled-components';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { OnboardAppInputs, onboardAppInput } from '../../schema/app';
import { useAddOnboardedApp, useOnboardedApps } from '../../hooks/use-onboarded-apps';
import { useGetContextTypes } from '../../hooks/use-context-type-query';
import { AppSelector } from './AppSelector';
import { Row } from '@equinor/eds-core-react/dist/types/components/Table/Row';
import { arrow_back, arrow_drop_left, chevron_down, chevron_left } from '@equinor/eds-icons';
import { InfoPopover } from '../InfoPopover';

const Style = {
	Wrapper: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: column;
	`,
	Card: styled(Card)`
		padding: 0.5rem 1rem;
	`,
	From: styled.form`
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	ErrorWrapper: styled.div`
		padding-top: 1rem;
		padding-bottom: 1rem;
	`,

	Row: styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
	RowHead: styled.div`
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
};

export const OnboardApp = () => {
	const { mutateAsync: createApp, reset: resetCreate } = useAddOnboardedApp();
	const { data } = useOnboardedApps();

	const [active, setActive] = useState<boolean>(false);

	const { data: contextTypes } = useGetContextTypes();

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		watch,
		setValue,
		clearErrors,
		reset,
	} = useForm<OnboardAppInputs>({
		resolver: zodResolver(onboardAppInput),
		defaultValues: {
			contextTypes: [],
		},
	});
	const appKey = watch().appKey;

	useEffect(() => {
		if (Boolean(data?.find((onboardedApp) => onboardedApp.appKey === appKey))) {
			setError('appKey', {
				message: `App with appKey ${appKey} is already onboarded.`,
			});
		}
	}, [data, appKey]);

	const onSubmit: SubmitHandler<OnboardAppInputs> = async (app) => {
		await createApp(app);
		resetCreate();
		reset({ appKey: '' });
		setValue('contextTypes', []);
	};

	return (
		<Style.Wrapper>
			<Style.Card>
				<Style.RowHead onClick={() => setActive((s) => !s)}>
					<Style.Row>
						<Typography variant="h6">Onboard App</Typography>
						<InfoPopover title="Onboard App">
							<Typography> Expand the form to onboard a new application. </Typography>
							<Typography> By pressing the chevron icon. </Typography>
						</InfoPopover>
					</Style.Row>
					<Button
						variant="ghost_icon"
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							setActive((s) => !s);
						}}
					>
						<Icon data={active ? chevron_down : chevron_left} />
					</Button>
				</Style.RowHead>
				{active && (
					<Style.From onSubmit={handleSubmit(onSubmit)} id="test">
						<AppSelector
							errors={errors.appKey}
							message={errors.appKey?.message}
							onChange={(app) => {
								clearErrors('appKey');
								if (app) {
									setValue('appKey', app.id);
								} else {
									setValue('appKey', '', { shouldDirty: true });
								}
							}}
						/>
						<Autocomplete
							id="textfield-context-types"
							multiple
							variant={errors.contextTypes && 'error'}
							helperText={errors.contextTypes?.message}
							options={contextTypes?.map((ct) => ct.type) || []}
							selectedOptions={watch().contextTypes}
							onOptionsChange={({ selectedItems }) => {
								setValue('contextTypes', selectedItems);
							}}
							itemCompare={(item, compare) => {
								return item === compare;
							}}
							label="Context Types"
						/>
						<Button
							form="test"
							type="submit"
							disabled={isSubmitting || Boolean(errors.appKey) || !watch().appKey}
						>
							Add Application
						</Button>
					</Style.From>
				)}
			</Style.Card>
		</Style.Wrapper>
	);
};
