import { Button, Card, Icon, TextField, Typography } from '@equinor/eds-core-react';

import styled from 'styled-components';

import { error_filled } from '@equinor/eds-icons';

import { useRouterConfigContext } from '../../context/RouterContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootInput, rootInput } from '../../schema/route';
import { useUpdatePortalConfig } from '../../hooks/use-portal-config-query';
import { usePortalContext } from '../../context/PortalContext';
import { Message } from '../Message';

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

export const RouterRoot = ({ canEdit, canPost }: { canEdit?: boolean; canPost?: boolean }) => {
	const { root, updateRoot, createNewRoute, routes } = useRouterConfigContext();
	const { mutate } = useUpdatePortalConfig();
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm<RootInput>({
		resolver: zodResolver(rootInput),
		values: root,
		reValidateMode: 'onChange',
	});

	const { activePortalId } = usePortalContext();
	const onSubmit: SubmitHandler<RootInput> = async (root) => {
		updateRoot(root.pageKey);
		if (activePortalId) {
			mutate({
				id: activePortalId,
				router: { root, routes },
			});
		}
	};

	const disabled = Object.keys(touchedFields).length <= 0;

	return (
		<Style.Form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header>
					<Typography variant="h5">Base Route Config</Typography>
				</Card.Header>
				<Style.Content>
					<TextField
						{...register('pageKey')}
						readOnly={!canEdit}
						id="pageKey"
						variant={errors.pageKey && 'error'}
						helperText={errors.pageKey?.message}
						inputIcon={errors.pageKey && <Icon data={error_filled} title="Error" />}
						label="Root Page Id"
					/>

					<Typography variant="h6">Root Messages</Typography>

					<TextField
						{...register('messages.errorMessage')}
						readOnly={!canEdit}
						id="errorMessage"
						label="Error Message"
						variant={errors.messages?.errorMessage && 'error'}
						helperText={errors.messages?.errorMessage?.message}
						inputIcon={errors.messages?.errorMessage && <Icon data={error_filled} title="Error" />}
					/>
				</Style.Content>
				<Card.Actions></Card.Actions>
			</Card>
			<Card>
				<Card>
					<Style.CardContent>
						<Message
							title="Base Route Config Help"
							messages={[
								'The page key is used to decide what application to load',
								'Error message is shown if application fails to load',
							]}
						/>
					</Style.CardContent>
				</Card>
			</Card>
			{canPost && (
				<Card>
					<Style.CardContent>
						<Typography variant="overline">Base Route Actions</Typography>
						<Style.Row>
							<Button disabled={disabled} type="submit">
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
						</Style.Row>
					</Style.CardContent>
				</Card>
			)}
		</Style.Form>
	);
};
