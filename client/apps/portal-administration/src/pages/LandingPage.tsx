import styled from 'styled-components';

import { Button, Card, CircularProgress, Icon, Typography } from '@equinor/eds-core-react';

import { User } from '../components/User/User';
import { InfoBox } from '../components/InfoBox/InfoBox';
import { ProjectHeader } from '../components/LandingPageHeader/PageHeader';
import { usePortalsQuery } from '../hooks/use-portals-query';
import { Loading } from '../components/Loading';
import * as AllIcons from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import { useAccess } from '../hooks/use-access';

export const Styles = {
	Wrapper: styled.div`
		width: 100%;
		height: calc(100vh - var(--header-height, 48px));
		background-color: #dee5e7;
		overflow: hidden;
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
		width: 46vw;
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
	Width: styled.div`
		width: 60%;
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
	`,
	Link: styled(Link).withConfig({ displayName: 'pa_' })`
		text-decoration: none;
		background-color: #fff;
		overflow: hidden;
		border-radius: 4px;

		&:hover {
			-webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
			-moz-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
			box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
		}
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
		border-radius: 4px;
	`,
};

export const LandingPage = (): JSX.Element => {
	const { isLoading, data: portalsData } = usePortalsQuery();
	const { isLoading: accessIsLoading, data: isAdmin } = useAccess();
	return (
		<Styles.Wrapper>
			<Styles.ContentWrapper>
				<Styles.Content>
					<ProjectHeader />
					<Styles.Section>
						<Styles.Width>
							<Typography>
								A portal is a web-based application that provides a single point of access to
								applications and information.
								<ul>
									<li>Portals can be customized to meet the needs of different users or groups.</li>
									<li>Portals can help streamline workflows and improve productivity.</li>
									<li>
										Portals can provide a consistent user experience across different applications.
									</li>
									<li>
										Portals can help organizations manage and secure access to applications and
										information.
									</li>
								</ul>
								<i>So How do you want your portal to be?</i>
							</Typography>
						</Styles.Width>
					</Styles.Section>

					<Styles.Section style={{ paddingTop: '1rem' }}>
						<Typography variant="h3">Portals</Typography>
						<div>
							{isLoading ? (
								<Loading detail="Loading Portals" />
							) : (
								<Styles.PortalList>
									{portalsData?.map((portal) => (
										<Styles.Link to={`${portal.id}/overview`} key={portal.id}>
											<Styles.Card>
												<Styles.IconWrapper>
													{portal.icon && Object.keys(AllIcons).includes(portal.icon) ? (
														<Icon name={portal.icon} size={24} />
													) : (
														<Styles.Icon
															dangerouslySetInnerHTML={{
																__html: portal?.icon?.replace(/\s+/g, ' ').trim() || '',
															}}
														/>
													)}
												</Styles.IconWrapper>
												<Styles.CardContent>
													<Typography as="h5" variant="h5">
														{portal.name}
													</Typography>
													<Typography
														style={{
															width: 'inherit',
															height: '60%',
															overflow: 'hidden',

															textOverflow: 'ellipsis',
														}}
													>
														{portal.description}
													</Typography>
												</Styles.CardContent>
											</Styles.Card>
										</Styles.Link>
									))}
								</Styles.PortalList>
							)}
						</div>
					</Styles.Section>
				</Styles.Content>
				<Styles.Details>
					<User />
					<InfoBox />
					{accessIsLoading ? null : isAdmin ? (
						<>
							<Button to={'/admin/portals'} as={Link} variant="outlined" color="primary">
								Advanced View
							</Button>
							<Button to={'/create'} as={Link} variant="outlined" color="primary">
								<Icon data={AllIcons.add} />
								Create Portal
							</Button>
						</>
					) : null}
				</Styles.Details>
			</Styles.ContentWrapper>
		</Styles.Wrapper>
	);
};
