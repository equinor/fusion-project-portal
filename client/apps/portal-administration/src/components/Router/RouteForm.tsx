import { Button, Card, Icon, TextField, Typography } from '@equinor/eds-core-react';

import styled from 'styled-components';

import { error_filled, info_circle } from '@equinor/eds-icons';

import { useRouterConfigContext } from '../../context/RouterContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { route } from '../../schema/route';
import { Route } from '../../types/router-config';
import { usePortalContext } from '../../context/PortalContext';
import { useUpdatePortalConfig } from '../../hooks/use-portal-config-query';
import { updateRoute } from '../../context/actions/router-actions';
import { ac } from 'vitest/dist/chunks/reporters.C_zwCd4j';
import { Message } from '../Message';
import { Form } from 'react-router-dom';

const Style = {
	Content: styled.div`
		padding: 0 1rem;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	`,
	CardContent: styled(Card.Content)`
		padding: 1rem;
		gap: 1rem;
	`,
	Form: styled.form`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	Row: styled.div`
		gap: 1rem;
		display: flex;
		flex-direction: row;
	`,
};

export const RouteForm = () => {
	const {
		activeRoute,
		root,
		updateRoute: updateRouteState,
		removeRouteById,
		createNewRoute,
		routes,
	} = useRouterConfigContext();
	const { activePortalId } = usePortalContext();
	const { mutate: updatePortalConfig } = useUpdatePortalConfig();
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm<Route>({
		resolver: zodResolver(route),
		values: activeRoute,
		reValidateMode: 'onChange',
	});

	const onSubmit: SubmitHandler<Route> = async (newRoute) => {
		updateRouteState(newRoute);

		if (activePortalId && routes) {
			updatePortalConfig({
				id: activePortalId,
				router: { root, routes: updateRoute(newRoute, routes || []) },
			});
		}
	};

	const disabled = Object.keys(touchedFields).length <= 0;

	return (
		<Style.Form onSubmit={handleSubmit(onSubmit)} id="route">
			<Card>
				<Card.Header>
					<Typography variant="h4">Route Config</Typography>
				</Card.Header>
				<Style.Content>
					<TextField id="id" label="Route Id" readOnly value={activeRoute?.id} />
					<TextField
						{...register('path')}
						id="path"
						label="Route Path"
						variant={errors.path && 'error'}
						helperText={errors.path?.message}
						inputIcon={errors.path && <Icon data={error_filled} title="Error" />}
					/>
					<TextField
						id="pageKey"
						{...register('pageKey')}
						label="Page Key"
						variant={errors.pageKey && 'error'}
						helperText={errors.pageKey?.message}
						inputIcon={errors.pageKey && <Icon data={error_filled} title="Error" />}
					/>
					<TextField
						rows={3}
						multiline
						{...register('description')}
						id="description"
						variant={errors.description && 'error'}
						helperText={errors.description?.message}
						inputIcon={errors.description && <Icon data={error_filled} title="Error" />}
						label="Description"
						maxLength={501}
					/>

					<Typography variant="h6">Route Messages</Typography>

					<TextField
						{...register('messages.errorMessage')}
						id="errorMessage"
						label="Error Message"
						variant={errors.messages?.errorMessage && 'error'}
						helperText={errors.messages?.errorMessage?.message}
						inputIcon={errors.messages?.errorMessage && <Icon data={error_filled} title="Error" />}
					/>
					<TextField
						{...register('messages.noPageMessage')}
						id="noPageMessage"
						label="No Page Message"
						variant={errors.messages?.noPageMessage && 'error'}
						helperText={errors.messages?.noPageMessage?.message}
						inputIcon={errors.messages?.noPageMessage && <Icon data={error_filled} title="Error" />}
					/>
				</Style.Content>
			</Card>
			<Card>
				<Style.CardContent>
					<Message
						title="Route Help"
						messages={[
							'A * on the end will hit all sub paths, ie. my-page/*',
							'Adding : at the front will result in a readable parameter ie. :myid',
							'The page key is used to decide what application to load',
							'Error message is shown if application fails to load',
							'Deleting a parent route will delete all child routes',
						]}
					/>
				</Style.CardContent>
			</Card>
			<Card>
				<Style.CardContent>
					<Typography variant="overline">Route Actions</Typography>
					<Style.Row>
						<Button
							disabled={!activeRoute || activeRoute?.id === '' || disabled}
							type="submit"
							form="route"
						>
							Save
						</Button>
						<Button
							variant="outlined"
							onClick={() => {
								createNewRoute();
							}}
						>
							Add New route
						</Button>
						<Button
							variant="outlined"
							disabled={!activeRoute || activeRoute?.id === ''}
							onClick={() => {
								activeRoute && removeRouteById(activeRoute?.id);
							}}
						>
							Delete Route
						</Button>
					</Style.Row>
				</Style.CardContent>
			</Card>
		</Style.Form>
	);
};
