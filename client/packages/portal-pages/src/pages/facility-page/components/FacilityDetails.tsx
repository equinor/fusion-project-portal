import { Typography } from '@equinor/eds-core-react';

import { useFrameworkCurrentContext } from '@equinor/portal-core';

import styled from 'styled-components';
import { Facility } from '../../sheared/types';

const Styles = {
	ContentItem: styled.div`
		margin-right: 1rem;
	`,
	Wrapper: styled.div`
		padding-top: 1rem;
		display: flex;
		flex-direction: row;
	`,
};

export const FacilityDetails = () => {
	const currentContext = useFrameworkCurrentContext<Facility>();

	return (
		<Styles.Wrapper>
			<Styles.ContentItem>
				<Typography variant="overline">Context Type</Typography>
				<Typography>Facility</Typography>
			</Styles.ContentItem>
			<Styles.ContentItem>
				<Typography variant="overline">Sap Plant</Typography>
				<Typography>{currentContext?.value.sapPlant}</Typography>
			</Styles.ContentItem>
			<Styles.ContentItem>
				<Typography variant="overline">ProCoSys Id</Typography>
				<Typography>{currentContext?.value.schema}</Typography>
			</Styles.ContentItem>
		</Styles.Wrapper>
	);
};
