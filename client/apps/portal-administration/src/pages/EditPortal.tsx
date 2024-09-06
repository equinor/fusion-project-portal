import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import { useGetPortal } from '../hooks/use-portal-query';
import { useGetContextTypes } from '../hooks/use-context-type-query';
import { Typography } from '@equinor/eds-core-react';
import { Loading } from '../components/Loading';
import { EditPortalForm } from '../components/Portal/EditPortalForm';

const Style = {
	Wrapper: styled.div`
		gap: 1rem;
		display: flex;
		padding: 1rem;
		flex-direction: column;
	`,
	Heading: styled(Typography)`
		padding: 0.5rem 0;
	`,
};

export const EditPortal = () => {
	const { portalId } = useParams();

	const { data: portal, isLoading: portalLoading } = useGetPortal(portalId);

	const { data: contextTypes, isLoading: contextTypeLoading } = useGetContextTypes();

	if (portalLoading || contextTypeLoading) {
		return <Loading detail="Loading Portal Config" />;
	}

	if (!portalId || !portal || !contextTypes) {
		return <>No portalId provided</>;
	}

	return (
		<Style.Wrapper>
			<EditPortalForm portal={portal} contextTypes={contextTypes} />
		</Style.Wrapper>
	);
};
