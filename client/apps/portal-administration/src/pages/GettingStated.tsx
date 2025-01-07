import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { Button, Card, Typography } from '@equinor/eds-core-react';

import { User } from '../components/User/User';
import { InfoBox } from '../components/InfoBox/InfoBox';

import { CardContent } from '@equinor/eds-core-react/dist/types/components/Card/CardContent';

export const Styles = {
	Wrapper: styled.div`
		width: 100%;
		height: calc(100vh - var(--header-height, 48px));
		background-color: #dee5e7;
		overflow: auto;
		display: flex;
		justify-content: center;
	`,
	ContentWrapper: styled.main`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding-top: 5rem;
	`,
	Section: styled.span`
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	`,
	Content: styled.section`
		padding: 0rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	Details: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 420px;
	`,
	Icon: styled.span`
		> svg {
			width: 25px;
			height: 25px;
		}
	`,

	PortalList: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		flex-wrap: wrap;
	`,

	Card: styled(Card).withConfig({ displayName: 'pa_' })`
		width: 46vw;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		/* width: 680px; */
		border-radius: 4px;
	`,
	CardContent: styled.div`
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	IconWrapper: styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 64px;
		height: 100%;
		background-color: #f5f5f5;
	`,
};

export const GettingStarted = (): JSX.Element => {
	return (
		<Styles.Wrapper>
			<Styles.ContentWrapper>
				<Styles.Content>
					<Typography variant="h1">Getting Stated</Typography>
					<Styles.Card>
						<Styles.CardContent>
							<Typography variant="h3">Introduction</Typography>
							<Typography variant="body_long">
								Tools are often designed to meet everyone's needs by trying to incorporate every
								possible feature. While this can be effective in some cases, for everyday tasks, such
								complexity can feel overwhelming and cumbersome.
							</Typography>
							<Typography variant="h3">Requirements</Typography>
							<Typography variant="body_long">
								Tools are often designed to meet everyone's needs by trying to incorporate every
								possible feature. While this can be effective in some cases, for everyday tasks, such
								complexity can feel overwhelming and cumbersome.
							</Typography>
							<Typography variant="h3">Request Access</Typography>
							<Typography variant="body_long">
								Access to create a new portal is restricted. If you need access, please Hans Vaage
							</Typography>
						</Styles.CardContent>
					</Styles.Card>
				</Styles.Content>
				<Styles.Details>
					<User />
					<InfoBox />
					<Button to={'/portals'} as={Link} variant="outlined" color="primary">
						Back
					</Button>
				</Styles.Details>
			</Styles.ContentWrapper>
		</Styles.Wrapper>
	);
};
