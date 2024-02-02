import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

import { Typography } from '@equinor/eds-core-react';
import { AppSearchBar } from './AppSearchBar';

const search_width = '720px';

export const Styled = {
	Main: styled.main`
		flex: 1;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: center;
		max-width: ${search_width};
		row-gap: ${tokens.spacings.comfortable.small};
	`,
	Content: styled.div`
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		h5 {
			font-size: ${tokens.typography.heading.h5.fontSize};
		}
	`,
	Question: styled(Typography)`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
	`,
	BarContainer: styled.div`
		width: 100%;
	`,
};

export const AppSearch = (): JSX.Element => {
	return (
		<Styled.Main>
			<Styled.Content>
				<Styled.Question group="heading" variant="h5">
					Which app are you looking for?
				</Styled.Question>
			</Styled.Content>
			<Styled.BarContainer>
				<AppSearchBar />
			</Styled.BarContainer>
		</Styled.Main>
	);
};

export default AppSearch;
