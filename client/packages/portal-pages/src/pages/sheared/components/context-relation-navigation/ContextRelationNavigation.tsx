import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useFrameworkCurrentContext, useOnboardedContexts } from '@equinor/portal-core';
import { RelationsTypes, useRelationsByType } from '@portal/core';

import { InfoIcon } from '@portal/ui';

const Styles = {
	Heading: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	`,
	LinkWrapper: styled.span`
		display: flex;
		align-items: center;
		gap: 0.5rem;
	`,
	Nav: styled.nav`
		padding: 0 1rem;
		gap: 0.5rem;
		display: flex;
		flex-wrap: wrap;
	`,
};

export const ContextRelationNavigation = ({
	title,
	type,
	path,
}: {
	title: string;
	path: string;
	type: RelationsTypes;
}) => {
	const currentContext = useFrameworkCurrentContext();

	const { data } = useRelationsByType(type, currentContext?.id);

	if (data.length === 0) return null;

	return (
		<div>
			<Styles.Heading>
				<Typography variant="h5">{title}</Typography>
				<InfoIcon message={`The following links, navigates to the related ${title.toLowerCase()}`} />
			</Styles.Heading>
			<Styles.Nav>
				{data.map((item, index) => (
					<Styles.LinkWrapper key={item.id}>
						<Typography link title={item.title} href={`/${path}/${item.id}`}>
							{item.title}
						</Typography>
						{data.length > index + 1 && <span>|</span>}
					</Styles.LinkWrapper>
				))}
			</Styles.Nav>
		</div>
	);
};
