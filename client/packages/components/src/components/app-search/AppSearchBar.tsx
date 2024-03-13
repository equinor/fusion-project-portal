import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import {
	SearchableDropdown,
	SearchableDropdownResolver,
	SearchableDropdownResultItem,
	SearchableDropdownSelectEvent,
} from '@equinor/fusion-react-searchable-dropdown';
import { SearchableDropdownElement } from '@equinor/fusion-wc-searchable-dropdown';

import { getSearchAppIcon } from './utils';
import { usePortalApps } from '@portal/core';
import { search } from '@equinor/eds-icons';
import { Button, Icon } from '@equinor/eds-core-react';

export const Styled = {
	Dropdown: styled(SearchableDropdown)`
		width: 100%;

		font-size: ${tokens.typography.navigation.menu_title.fontSize};
		border: 0;
		&::part(list) {
			--fwc-list-vertical-padding: 0px;
		}

		&::part() &::part(list-item) {
			--fwc-list-item-vertical-padding: ${tokens.spacings.comfortable.medium_small};
			--fwc-list-item-font-size: ${tokens.typography.navigation.menu_title.fontSize};
			padding-left: ${tokens.spacings.comfortable.medium};
			padding-right: ${tokens.spacings.comfortable.medium};
			border-bottom: 1px solid ${tokens.colors.interactive.disabled__border.hex};
			height: auto;
		}
	`,
	Wrapper: styled.div`
		width: 350px;
	`,
};

const notFound = {
	id: 'not-found',
	isError: true,
	isDisabled: true,
	graphicType: 'eds',
	graphic: 'do_not_disturb',
	title: 'App Not Found',
	subTitle: 'Try different search query',
} as SearchableDropdownResultItem;

const noApps = {
	id: 'oops-apps',
	isError: true,
	isDisabled: true,
	graphicType: 'eds',
	graphic: 'mood_sad',
	title: 'Oops, No Apps',
	subTitle: 'Something is wrong, there are no apps available',
} as SearchableDropdownResultItem;

const sortByTitle = (a: SearchableDropdownResultItem, b: SearchableDropdownResultItem) => {
	const titleA = a.title || '';
	const titleB = b.title || '';
	return titleA.localeCompare(titleB);
};

const sortTitleByQuery = (query: string) => (a: SearchableDropdownResultItem, b: SearchableDropdownResultItem) => {
	const titleNameA = a.title ?? '';
	const titleNameB = b.title ?? '';

	const matchA = titleNameA.toLowerCase().includes(query.toLowerCase());
	const matchB = titleNameB.toLowerCase().includes(query.toLowerCase());

	if (matchA && !matchB) return -1;
	if (!matchA && matchB) return 1;
	return 0;
};

export const AppSearchBar = (): JSX.Element => {
	const { apps } = usePortalApps();
	const navigate = useNavigate();

	const ref = useRef();

	const [active, setActive] = useState(true);
	useEffect(() => {
		return document.addEventListener('keydown', (event) => {
			if (event.key === 'F1') {
				event.preventDefault();
				active ? handleFocus() : handleBlur();
			}
		});
	}, [active]);

	const handleFocus = () => {
		setActive(false);
		document
			.querySelector<SearchableDropdownElement>('fwc-searchable-dropdown#top-bar-app-search')
			?.textInputElement?.focus();
	};

	const handleBlur = () => {
		setActive(true);
		document
			.querySelector<SearchableDropdownElement>('fwc-searchable-dropdown#top-bar-app-search')
			?.textInputElement?.blur();
	};

	const resolver = useMemo(() => {
		const alteredAsDropdownItems = apps
			? apps.map((app) => {
					return {
						id: app.key,
						title: app.name,
						subTitle: app.category?.name,
						graphic: getSearchAppIcon(app),
						graphicType: 'inline-svg',
					} as SearchableDropdownResultItem;
			  })
			: [noApps];

		return {
			searchQuery: async (query: string) => {
				const matcher = new RegExp(query, 'i');
				const matched = alteredAsDropdownItems
					?.filter(
						(item) => item.title?.match(matcher) || item.subTitle?.match(matcher) || item.id?.match(matcher)
					)
					.sort(sortByTitle)
					.sort(sortTitleByQuery(query));

				if (matched.length !== 0) {
					return matched;
				} else {
					return [notFound];
				}
			},
		} as SearchableDropdownResolver;
	}, [apps]);

	const onSelect = useCallback((e: SearchableDropdownSelectEvent) => {
		const appKey = e.nativeEvent.detail.selected[0].id;

		navigate(`/apps/${appKey}/`);
	}, []);

	return (
		<>
			{active ? (
				<Button onClick={() => handleFocus()} variant="ghost_icon" title="Press F1 to toggle search for App">
					<Icon data={search} />
				</Button>
			) : (
				<Styled.Wrapper>
					<Styled.Dropdown
						ref={ref.current}
						id="top-bar-app-search"
						placeholder="Search for App"
						autofocus
						variant="header"
						initialText="Type to start searching for apps..."
						onSelect={onSelect}
						onBlur={() => setActive(true)}
						resolver={resolver}
					/>
				</Styled.Wrapper>
			)}
		</>
	);
};

export default AppSearchBar;
