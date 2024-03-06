import { ContextProvider, PortalContextSelector, useOnboardedContexts } from '@equinor/portal-core';
import { ProjectHeader } from './PageHeader';

import { css } from '@emotion/css';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { User } from './user/UserCard';

import { OnboardedContext } from '@portal/types';
import { Button, Typography } from '@equinor/eds-core-react';
import { useFramework } from '@equinor/fusion-framework-react';
import InfoBox from '../sheared/components/InfoBox/InfoBox';

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
	viewDescription: css`
		width: 50vw;
	`,
};

export const Styles = {
	Wrapper: styled.main`
		display: flex;
		flex-direction: column;
	`,

	Content: styled.section`
		overflow: auto;
		padding: 1rem 2rem;
		height: 100vh;
	`,

	Details: styled.div`
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		right: 3rem;
		top: 16rem;
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
};

export const ProjectPortalPage = (): JSX.Element => {
	const { onboardedContexts } = useOnboardedContexts();
	const { context } = useFramework().modules;

	const contextTypes = (onboardedContexts || []).reduce((acc, item) => {
		if (acc[item.type]) {
			acc[item.type].contexts.push(item);
			return acc;
		}

		acc[item.type] = { type: item.type, contexts: [item] };

		return acc;
	}, {} as Record<string, { type: string; contexts: OnboardedContext[] }>);

	return (
		<Styles.Wrapper>
			<ProjectHeader />
			<Styles.Details>
				<User />
				<InfoBox />
			</Styles.Details>

			<Styles.Content>
				<div className={styles.contentWrapper}>
					<p className={styles.viewDescription}>
						Please choose a project or facility from the search field to continue. This will direct you to
						the context's homepage, where you can access the applications associated with the selected
						context through the menu.
					</p>
					<ContextProvider>
						<PortalContextSelector />
					</ContextProvider>
				</div>

				<Styles.Row>
					{Object.values(contextTypes).map((contextType) => {
						return (
							<div key={contextType.type}>
								<Typography variant="h5">{contextType.type}</Typography>
								<Styles.Col>
									{contextType.contexts.map((onboardedContext) => (
										<Button
											fullWidth
											key={onboardedContext.id}
											onClick={() =>
												context.setCurrentContextByIdAsync(onboardedContext.contextId)
											}
											variant="ghost"
										>
											{onboardedContext.title}
										</Button>
									))}
								</Styles.Col>
							</div>
						);
					})}
				</Styles.Row>
			</Styles.Content>
		</Styles.Wrapper>
	);
};
