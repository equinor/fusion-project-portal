import { Tabs, Breadcrumbs } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const HeaderStyle = {
	Wrapper: styled.div`
		height: calc(100% - 6rem);
		width: 100%;
		position: absolute;
	`,
	TabsListWrapper: styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 44px;
		border-bottom: 2px solid #e0e0e0;
	`,
	Content: styled.div`
		padding: 1rem;
		width: -webkit-fill-available;
	`,
	Tab: styled(Tabs.Tab)`
		${({ active }) => (!active ? 'border-bottom-color: transparent;' : '')};
		border-bottom-width: 2px;
	`,
	Row: styled.div`
		display: flex;
		align-items: center;
	`,

	Breadcrumbs: styled(Breadcrumbs)`
		> * > li > * {
			overflow: visible;
			font-size: 1.25em;
		}
	`,
};
