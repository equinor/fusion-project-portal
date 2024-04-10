import { ContextProvider, PortalContextSelector } from '@equinor/portal-core';
import { ProjectHeader } from './PageHeader';

import { css } from '@emotion/css';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { User } from './user/UserCard';

import InfoBox from '../sheared/components/InfoBox/InfoBox';
import { useUserOrgDetails } from '@portal/core';
import { Checkbox, LinearProgress, Typography } from '@equinor/eds-core-react';

import { useState } from 'react';
import { useFeature } from '@equinor/fusion-framework-react-app/feature-flag';

const styles = {
	contentSection: css`
		padding: 20rem 5rem 0rem 5rem;

		@media only screen and (max-width: 60rem) {
			padding: 20rem 2rem 2rem 2rem;
		}
		@media only screen and (max-width: 45rem) {
			padding: 5rem 1rem 1rem 1rem;
		}
	`,
	contentWrapper: css`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
};

export const Styles = {
	Wrapper: styled.main`
		display: flex;
		flex-direction: column;
	`,

	Section: styled.span`
		width: 40vw;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	`,
	Content: styled.section`
		padding: 0rem 2rem;
		height: 100vh;
	`,

	Details: styled.div`
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		right: 5rem;
		top: -5rem;
		z-index: 1;
		width: 360px;
	`,

	TabsWrapper: styled.div`
		display: flex;
		flex-direction: row;
		gap: ${tokens.spacings.comfortable.large};
		padding: 1rem 2rem;
		width: calc(100vw - 490px);
		@media only screen and (max-width: 1300px) {
			flex-direction: column;
		}
	`,
	Row: styled.div`
		display: flex;
		flex-direction: row;
		gap: ${tokens.spacings.comfortable.x_large};
		padding-top: ${tokens.spacings.comfortable.large};
		width: calc(100vw - 490px);
		@media only screen and (max-width: 1300px) {
			flex-direction: column;
		}
	`,
	Col: styled.div`
		gap: 0s.5rem;
		display: flex;
		flex: 1;
		flex-direction: column;
	`,
	Heading: styled.div`
		padding-top: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	`,
	LinkWrapper: styled.span`
		display: flex;
		align-items: center;
		gap: 0.5rem;
	`,
	Nav: styled.nav`
		padding: 1rem 0;
		gap: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		width: 25%;
	`,
	Loading: styled.div`
		padding: 1rem 0;
		width: 25%;
	`,
	Padding: styled.span`
		padding: 2rem;
	`,
};

export const ProjectPortalPage = (): JSX.Element => {
	const [value, setValue] = useState(false);
	const { data, isLoading } = useUserOrgDetails(value);
	const { feature } = useFeature('project-prediction');

	return (
		<Styles.Wrapper>
			<ProjectHeader>
				<Styles.Details>
					<User />
					<InfoBox />
				</Styles.Details>
				<Styles.Content>
					<div className={styles.contentWrapper}>
						<Styles.Section>
							<Typography>
								Please choose a project or facility from the search field to continue. This will direct
								you to the context's homepage, where you can access the applications associated with the
								selected context through the menu.
							</Typography>
						</Styles.Section>
						<ContextProvider>
							<PortalContextSelector />
						</ContextProvider>
					</div>
					{feature?.enabled && (
						<Styles.Padding>
							<Styles.Section>
								<Styles.Heading>
									<Typography variant="h5">Allocated Projects</Typography>
									<Checkbox
										label="Use all past allocations"
										checked={value}
										onChange={() => {
											setValue((s) => !s);
										}}
									/>
								</Styles.Heading>
								<Typography>
									{value ? 'All' : 'Current'}{' '} projects:
								</Typography>
							</Styles.Section>
							{isLoading ? (
								<Styles.Loading>
									<LinearProgress />
									<Typography>Finding your allocations...</Typography>
								</Styles.Loading>
							) : (
								<Styles.Nav>
									{data && data.length > 0 ? (
										data.map((item, index) => (
											<Styles.LinkWrapper key={item.id}>
												<Typography link title={item.title} href={`/project/${item.id}`}>
													{item.title}
												</Typography>
												{data.length > index + 1 && <span>|</span>}
											</Styles.LinkWrapper>
										))
									) : (
										<>
											{data && (
												<Typography variant="overline">
													Sorry, we could not find any projects from your allocations.
												</Typography>
											)}
										</>
									)}
								</Styles.Nav>
							)}
						</Styles.Padding>
					)}
				</Styles.Content>
			</ProjectHeader>
		</Styles.Wrapper>
	);
};
