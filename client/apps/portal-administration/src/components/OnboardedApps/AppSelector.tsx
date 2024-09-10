import { SearchableDropdownResultItem, SearchableDropdownResult } from '@equinor/fusion-react-searchable-dropdown';
import { useFramework } from '@equinor/fusion-framework-react';
import { useCallback, useMemo, useState } from 'react';
import { Autocomplete, Icon, Typography } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { error_filled } from '@equinor/eds-icons';
import { FieldError } from 'react-hook-form';

const singleItem = (props: unknown): SearchableDropdownResultItem => {
	return Object.assign({ id: '0', title: 'Dummy title' }, props);
};

function contextResultMapped(apps: App[]): SearchableDropdownResult {
	return apps.map((app) =>
		singleItem({
			id: app.appKey,
			title: app.displayName,
			subTitle: app.appKey,
		})
	);
}

const minQueryLength = 2;

type App = {
	appKey: string;
	displayName: string;
};

export const useResolver = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('apps');

	const searchQuery = useCallback(async (): Promise<SearchableDropdownResult> => {
		let searchResult: SearchableDropdownResult = [];
		if (!client) {
			return [];
		}

		try {
			const apps = (await (await client).json<{ value: App[] }>('/apps')).value;

			if (apps[0] && !apps[0]) return searchResult;
			// Structure as type
			searchResult = contextResultMapped(apps);

			if (searchResult.length === 0) {
				searchResult.push(singleItem({ title: 'No matches...', isDisabled: true }));
			}

			return searchResult;
		} catch (e) {
			return [
				singleItem({
					title: 'API Error',
					subTitle: e,
					isDisabled: true,
					isError: true,
				}),
			];
		}
	}, [client]);

	return { searchQuery };
};

export const useAppSearch = () => {
	const { searchQuery } = useResolver();

	return useQuery<SearchableDropdownResult>({
		queryKey: ['apps'],
		queryFn: async () => await searchQuery(),
	});
};

export const AppSelector = ({
	onChange,
	errors,
	message,
}: {
	onChange: (context?: SearchableDropdownResultItem) => void;
	errors?: FieldError;
	message?: string;
}) => {
	const [input, setInput] = useState<string>('');
	const { data, isLoading } = useAppSearch();

	const search = async (input: string) => {
		setInput(input);
	};

	const options = useMemo(() => {
		return (
			data?.filter(
				(app) =>
					app.id.toLowerCase().includes(input.toLowerCase()) ||
					app.title?.toLowerCase().includes(input.toLowerCase())
			) || []
		);
	}, [data, input]);

	return (
		<Autocomplete<SearchableDropdownResultItem>
			id="apps-types"
			onInputChange={search}
			options={options}
			loading={isLoading}
			variant={errors && 'error'}
			helperText={message}
			helperIcon={errors && <Icon data={error_filled} title="Error" size={16} />}
			onOptionsChange={(value) => {
				onChange(value?.selectedItems[0]);
			}}
			noOptionsText={isLoading ? 'Loading data..' : 'No options'}
			optionComponent={CustomItem}
			optionLabel={(contextTypes) => contextTypes.title || 'No App found'}
			itemCompare={(item, compare) => {
				return item === compare;
			}}
			optionsFilter={() => true}
			label="Select App"
			multiline
		/>
	);
};

const Style = {
	ItemWrapper: styled.div`
		display: flex;
		flex-direction: column;
		padding: 1rem 0rem;
		min-width: 500px;
		gap: 0.25rem;
	`,
};

function CustomItem(option: SearchableDropdownResultItem) {
	const { title, subTitle } = option;
	return (
		<Style.ItemWrapper>
			<Typography variant="h5">{title}</Typography>
			<Typography group="paragraph" variant="caption">
				{subTitle}
			</Typography>
		</Style.ItemWrapper>
	);
}
