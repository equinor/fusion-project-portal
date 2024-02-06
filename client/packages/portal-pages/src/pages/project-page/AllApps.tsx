import styled from 'styled-components';
import { AppGroup } from '@portal/components';
import { useFavorites } from './hooks/use-favorites';

const Styles = {
	Wrapper: styled.div`
		column-count: 3;
		width: 100%;
		@media only screen and (max-width: 1500px) {
			column-count: 2;
		}
		@media only screen and (max-width: 1200px) {
			column-count: 1;
		}
	`,
};

export const AllApps = () => {
	const { appGroups, addFavorite } = useFavorites();

	return (
		<Styles.Wrapper>
			{appGroups &&
				appGroups.map((appGroup) => (
					<div key={appGroup.name}>
						<AppGroup group={appGroup} onFavorite={(app) => addFavorite(app.key)} />
					</div>
				))}
		</Styles.Wrapper>
	);
};
