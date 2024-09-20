import { Card, Button, Icon, Autocomplete, Typography } from '@equinor/eds-core-react';
import { add, chevron_down, chevron_left } from '@equinor/eds-icons';
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
import { InfoPopover } from '../InfoPopover';

const Style = {
	Content: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	Card: styled(Card)<{ background?: string }>`
		padding: 0.5rem 1rem;
		background-color: ${({ background }) => background};
	`,
	ActionBar: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	`,
	From: styled.form`
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
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

export const AddContext = () => {
	const { data: contextTypes } = useGetContextTypes();
	const [types, setTypes] = useState<string[]>([]);
	const [activeContextIs, setActiveContextId] = useState<string | undefined>('');

	const [contextError, setContextError] = useState<FieldError | undefined>();
	const [active, setActive] = useState<boolean>(false);

	const { data: selectedContext } = useContextById(activeContextIs);
	const { data: onboardedContexts } = useOnboardedContexts();

	const onboardedContextIds = useMemo(() => {
		return onboardedContexts?.map((context) => context.contextId) || [];
	}, [onboardedContexts]);

	const { mutateAsync } = useAddContext();

	return (
		<Style.Content>
			<Style.Card>
				<Style.RowHead onClick={() => setActive((s) => !s)}>
					<Style.Row>
						<Typography variant="h6">Add Context Type</Typography>
						<InfoPopover title="Add Context Type">
							<Typography>
								Expand the form to add new context type by pressing the chevron icon.
							</Typography>
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
					<Style.From>
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
							label="Filter Search By Context Types"
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
					</Style.From>
				)}
			</Style.Card>
			{selectedContext && (
				<Style.Card>
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
				</Style.Card>
			)}
		</Style.Content>
	);
};
