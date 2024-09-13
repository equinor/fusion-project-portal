import { styled } from 'styled-components';
import { EditContextTypeForm } from '../components/OnboardedContexts/ContextType';

const Style = {
	Content: styled.div`
		padding-top: 1rem;
		width: 100%;
		height: -webkit-fill-available;
	`,
};

export const ContextTypesPage = () => {
	return (
		<Style.Content>
			<EditContextTypeForm />
		</Style.Content>
	);
};
