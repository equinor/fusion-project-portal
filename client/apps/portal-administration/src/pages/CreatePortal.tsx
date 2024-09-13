import styled from 'styled-components';
import { CreatePortalForm } from '../components/Portals/CreatePortalForm';

const Style = {
	Wrapper: styled.div`
		display: flex;
		padding: 1rem 0;
		flex-direction: column;
		width: -webkit-fill-available;
		height: -webkit-fill-available;
	`,
};

export const CreatePortal = () => {
	return (
		<Style.Wrapper>
			<CreatePortalForm />
		</Style.Wrapper>
	);
};
