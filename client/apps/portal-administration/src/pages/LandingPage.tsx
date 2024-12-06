import styled from 'styled-components';

import { Card, Icon, Typography } from '@equinor/eds-core-react';

import { User } from '../components/User/User';
import { InfoBox } from '../components/InfoBox/InfoBox';
import { ProjectHeader } from '../components/LandingPageHeader/PageHeader';
import { usePortalsQuery } from '../hooks/use-portals-query';
import { Loading } from '../components/Loading';
import * as AllIcons from '@equinor/eds-icons';
import { CardContent } from '@equinor/eds-core-react/dist/types/components/Card/CardContent';
import { PortalList } from './PortalsList';
import { PageMessage } from '../components/PageMessage/PageMessage';
import { Message } from '../components/Message';

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
		width: 50vw;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	`,
	Content: styled.section`
		padding: 0rem 2rem;
		height: 100vh;
	`,
	Details: styled.div`
		/* position: absolute; */
		display: flex;
		flex-direction: column;
		gap: 1rem;
		/*right: 25rem;
		top: 5rem;
		z-index: 1; */
		width: 420px;
	`,
	Icon: styled.span`
		> svg {
			width: 25px;
			height: 25px;
		}
	`,
	Card: styled(Card).withConfig({ displayName: 'pa_' })`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem;
		width: 380px;
		height: 100px;
		overflow: hidden;
	`,

	PortalList: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		flex-wrap: wrap;
	`,
	IconWrapper: styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 64px;
		height: 100%;
	`,
};

type Portal = {
	name: string;
	description: string;
	shortName: string;
};

export const LandingPage = (): JSX.Element => {
	const { isLoading, data: portalsData } = usePortalsQuery();
	return (
		<Styles.Wrapper>
			<Styles.ContentWrapper>
				<Styles.Content>
					<ProjectHeader />
					<Styles.Section>
						<Typography>
							A portal is a web-based application that provides a single point of access to applications
							and information. Portals can be customized to meet the needs of different users or groups.
							Portals can help streamline workflows and improve productivity. Portals can provide a
							consistent user experience across different applications. Portals can help organizations
							manage and secure access to applications and information. So How do you whant your portal to
							be?
						</Typography>
					</Styles.Section>

					<Styles.Section>
						<Typography variant="h5">Portals</Typography>
						<div>
							{isLoading ? (
								<Loading detail="Loading Portals" />
							) : (
								<Styles.PortalList>
									{portalsData?.map((portal) => (
										<Styles.Card key={portal.id}>
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
											<div>
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
											</div>
										</Styles.Card>
									))}
								</Styles.PortalList>
							)}
						</div>
					</Styles.Section>
				</Styles.Content>
				<Styles.Details>
					<User />
					<InfoBox />
				</Styles.Details>
			</Styles.ContentWrapper>
		</Styles.Wrapper>
	);
};
