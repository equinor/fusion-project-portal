import { styled } from 'styled-components';
import { Loading } from '../components/Loading';
import { useOnboardedApps } from '../hooks/use-onboarded-apps';
import { AppsTable } from '../components/OnboardedApps/AppsTable';
import { OnboardApp } from '../components/OnboardedApps/OnboardApp';

const Style = {
	Content: styled.div`
		padding-top: 1rem;
		width: 100%;
		height: -webkit-fill-available;
	`,
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		height: 100%;
	`,
};

export const OnboardedApps = () => {
	const { data, isLoading } = useOnboardedApps();

	return (
		<Style.Content>
			<Style.Wrapper>
				<OnboardApp />
				{isLoading ? <Loading detail="Loading Onboarded Apps" /> : <AppsTable onboardedApps={data} />}
			</Style.Wrapper>
		</Style.Content>
	);
};
