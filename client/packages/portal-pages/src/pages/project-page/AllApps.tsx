import styled from 'styled-components';
import { AppGroup } from '@portal/components';
import { useFavorites } from './hooks/use-favorites';
import { useApps } from './components/app-search/hooks/use-apps';

const Styles = {
	Wrapper: styled.div`
		column-count: 3;
		max-width: calc(100vw - 490px);
		gap: 1.5rem;

		@media only screen and (max-width: 1500px) {
			column-count: 2;
		}
		@media only screen and (max-width: 1200px) {
			column-count: 1;
		}
	`,
};

export const AllApps = () => {
	const { addFavorite } = useFavorites();
	const { appGroups } = useApps();

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
