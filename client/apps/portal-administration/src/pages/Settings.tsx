import styled from 'styled-components';

import { Outlet } from 'react-router-dom';
import { SettingsHeader } from '../components/Settings/SettingsHeader';

const Styles = {
	Content: styled.div`
		display: flex;
		width: 100%;
		height: inherit;
	`,
	Section: styled.section`
		flex-direction: column;
		padding: 1rem;
		display: flex;
		height: inherit;
	`,
	Wrapper: styled.div`
		display: block;
		overflow: hidden;
		height: 100%;
	`,
};

export const Settings = () => {
	return (
		<Styles.Wrapper>
			<Styles.Section>
				<SettingsHeader />
				<Styles.Content>
					<Outlet />
				</Styles.Content>
			</Styles.Section>
		</Styles.Wrapper>
	);
};
