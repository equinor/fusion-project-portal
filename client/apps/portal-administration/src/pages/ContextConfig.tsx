import styled from 'styled-components';
import { OnboardedContextsTable } from '../components/OnboardedContexts/OnboardedContextsTable';

import { Loading } from '../components/Loading';
import { useOnboardedContexts } from '../hooks/use-onboarded-context';
import { AddContext } from '../components/OnboardedContexts/AddContext';

const Style = {
	Content: styled.div`
		padding-top: 1rem;
		width: 100%;
		height: -webkit-fill-available;
	`,
};

export const Context = () => {
	const { isLoading, data: onboardedContexts } = useOnboardedContexts();

	if (isLoading) return <Loading detail="Loading Onboarded Contexts" />;

	return (
		<Style.Content>
			<AddContext />
			<OnboardedContextsTable onboardedContexts={onboardedContexts} />
		</Style.Content>
	);
};
