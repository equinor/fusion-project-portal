import { Card } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const StyledCardWrapper = styled(Card)<{ color?: string }>`
	display: flex;
	flex-direction: column;
	background-color: ${({ color }) => color};
	overflow: hidden;
`;

export const StyledHeader = styled(Card.Header)`
	display: flex;
`;

export const StyledContent = styled(Card.Content)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const StyledContentRow = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-bottom: 1rem;
`;

export const StyledContentItem = styled.div`
	flex: 1;
`;
