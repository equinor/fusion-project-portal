import styled from 'styled-components';
import { CreatePortalForm } from '../components/Portals/CreatePortalForm';
import { Link } from 'react-router-dom';

import { Button, Card, Typography } from '@equinor/eds-core-react';

import { User } from '../components/User/User';
import { InfoBox } from '../components/InfoBox/InfoBox';

import { CardContent } from '@equinor/eds-core-react/dist/types/components/Card/CardContent';
import { i } from 'vite/dist/node/types.d-aGj9QkWt';
import { useAccess } from '../hooks/use-access';
import { Loading } from '../components/Loading';
import { PageMessage } from '../components/PageMessage/PageMessage';

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
		width: 50vw;
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
		display: flex;
		flex-direction: row;
		gap: 1rem;
		width: 380px;
		height: 100px;
		overflow: hidden;
		border-radius: 4px;
	`,
	CardContent: styled.div`
		padding: 1rem 0.5rem;
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

export const CreatePortal = (): JSX.Element => {
	const { data: hasAccess, isLoading } = useAccess();

	return (
		<Styles.Wrapper>
			<Styles.ContentWrapper>
				<Styles.Content>
					<Typography variant="h1">Create New Portal</Typography>
					{isLoading ? (
						<div style={{ width: '868px', height: '500px' }}>
							<Loading detail="Checking Access" />
						</div>
					) : hasAccess ? (
						<CreatePortalForm />
					) : (
						<div style={{ width: '868px', height: '500px' }}>
							<PageMessage type="Warning" title="No Access">
								<Typography>You do not have the permissions to create a new portal.</Typography>
								<Typography>
									Required role is <b>Fusion.ProjectPortal.Admin</b>.
								</Typography>
							</PageMessage>
						</div>
					)}
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
