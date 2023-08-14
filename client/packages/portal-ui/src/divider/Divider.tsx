import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const StyledDivider = styled.hr`
	width: 1px;
	height: auto;
	align-self: stretch;
	border: none;
	background: ${tokens.colors.ui.background__medium.rgba};
`;

type DividerProps = {
	id?: string;
};

export function Divider({ id }: DividerProps): JSX.Element {
	return <StyledDivider id={id} />;
}
