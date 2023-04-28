import styled from 'styled-components';

export const StyledContentSection = styled.section`
	padding: 20rem 5rem 0rem 5rem;

	@media only screen and (max-width: 60rem) {
		padding: 20rem 2rem 2rem 2rem;
	}
	@media only screen and (max-width: 45rem) {
		padding: 5rem 1rem 1rem 1rem;
	}
`;
export const StyledContentWrapper = styled.div`
	padding: 2rem 0rem;
`;

export const StyledPaseSectionWrapper = styled.section`
	display: flex;
	gap: 3rem;
	margin-top: 5rem;
`;

export const StyledViewSelectorWrapper = styled.div`
	display: flex;
	padding-top: 1rem;
`;
