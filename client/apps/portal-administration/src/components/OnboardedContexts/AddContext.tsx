import { Card, Button, Icon, Autocomplete, Typography } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import styled from 'styled-components';
import { useGetContextTypes } from '../../hooks/use-context-type-query';
import { ContextSelector } from './ContextSelector';
import { useMemo, useState } from 'react';
import { Message } from '../Message';
import { tokens } from '@equinor/eds-tokens';
import { useAddContext } from '../../hooks/use-add-context';
import { useContextById } from '../../hooks/use-context-by-id';
import { useOnboardedContexts } from '../../hooks/use-onboarded-context';
import { FieldError } from 'react-hook-form';

const Styles = {
	Content: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	Card: styled(Card)<{ background?: string }>`
		padding: 1rem;
		background-color: ${({ background }) => background};
	`,
	ActionBar: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	`,
};

export const AddContext = () => {
	const { data: contextTypes } = useGetContextTypes();
	const [types, setTypes] = useState<string[]>([]);
	const [activeContextIs, setActiveContextId] = useState<string | undefined>('');

	const [contextError, setContextError] = useState<FieldError | undefined>();

	const { data: selectedContext } = useContextById(activeContextIs);
	const { data: onboardedContexts } = useOnboardedContexts();

	const onboardedContextIds = useMemo(() => {
		return onboardedContexts?.map((context) => context.contextId) || [];
	}, [onboardedContexts]);

	const { mutateAsync } = useAddContext();

	return (
		<Styles.Content>
			<Styles.Card background={tokens.colors.ui.background__info.hex}>
				<Message
					title="Add Context"
					messages={[
						'To be able to make a app context specific the system needs to add the context',
						'Search for the context that is missing',
						'Press add to alow for the context tu be utilized',
						'Use the context type filter to specify your search',
					]}
				/>
			</Styles.Card>
			<Styles.Card>
				<Autocomplete<string>
					id="app-context-types"
					multiple
					options={contextTypes?.map((c) => c.type) || []}
					optionLabel={(contextTypes) => contextTypes}
					itemCompare={(item, compare) => {
						return item === compare;
					}}
					onOptionsChange={({ selectedItems }) => {
						setTypes(selectedItems);
					}}
					label="Context Types"
				/>
				<ContextSelector
					types={types}
					message={contextError?.message}
					errors={contextError}
					onChange={() => {
						setContextError(undefined);
					}}
					onOptionsChange={(context) => {
						setContextError(undefined);
						if (onboardedContextIds.includes(context.id)) {
							setContextError({
								message: 'Context is already onboarded',
								type: 'validate',
							});
							return;
						}
						setActiveContextId(context.id);
					}}
				/>
				<Button
					disabled={!selectedContext}
					onClick={() => {
						mutateAsync({
							externalId: selectedContext.externalId,
							type: selectedContext.type.id,
							description: selectedContext.title,
						});
					}}
				>
					<Icon data={add} />
					Add Context
				</Button>
			</Styles.Card>
			{selectedContext && (
				<Styles.Card>
					<Card.Header>
						<Card.HeaderTitle>
							<Typography variant="h4">{selectedContext.title}</Typography>
						</Card.HeaderTitle>
					</Card.Header>
					<Card.Content>
						<strong>{selectedContext.type.id}</strong>
						<p>{selectedContext.externalId}</p>
						<p>{selectedContext.id}</p>
					</Card.Content>
				</Styles.Card>
			)}
		</Styles.Content>
	);
};
