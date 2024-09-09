import { Button, Card, Icon, TextField, Typography } from '@equinor/eds-core-react';

import styled from 'styled-components';

import { error_filled } from '@equinor/eds-icons';

import { useRouterConfigContext } from '../../context/RouterContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootInput, rootInput } from '../../schema/route';
import { useUpdatePortalConfig } from '../../hooks/use-portal-config-query';
import { usePortalContext } from '../../context/PortalContext';

const Style = {
	Content: styled.div`
		padding: 1rem;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	`,
};

export const RouterRoot = () => {
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header>
					<Typography variant="h4">Base Config</Typography>
				</Card.Header>
				<Style.Content>
					<TextField
						{...register('pageKey')}
						id="pageKey"
						variant={errors.pageKey && 'error'}
						helperText={errors.pageKey?.message}
						inputIcon={errors.pageKey && <Icon data={error_filled} title="Error" />}
						label="Root Page Id"
					/>

					<Typography variant="h6">Root Messages</Typography>

					<TextField
						{...register('messages.errorMessage')}
						id="errorMessage"
						label="Error Message"
						variant={errors.messages?.errorMessage && 'error'}
						helperText={errors.messages?.errorMessage?.message}
						inputIcon={errors.messages?.errorMessage && <Icon data={error_filled} title="Error" />}
					/>
				</Style.Content>
				<Card.Actions>
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
				</Card.Actions>
			</Card>
		</form>
	);
};
