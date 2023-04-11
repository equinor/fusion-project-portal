import { Search } from '@equinor/eds-core-react';
import { useAppGroupsQuery, appsMatchingSearch } from '@equinor/portal-core';
import { GroupWrapper, LoadingMenu, PortalMenu } from '@equinor/portal-ui';
import { useState } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
	padding: 1rem 0;
`;

export function MenuGroups() {
	const { data, isLoading } = useAppGroupsQuery();
	const [searchText, setSearchText] = useState<string | undefined>();

	return (
		<PortalMenu>
			<Search
				id="app-search"
				placeholder="Search for apps"
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			<StyledWrapper>
				{isLoading ? <LoadingMenu /> : <GroupWrapper appGroups={appsMatchingSearch(data ?? [], searchText)} />}
			</StyledWrapper>
		</PortalMenu>
	);
}
