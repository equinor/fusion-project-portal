import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjectPortalPage } from './components/ProjectPortalPage';

const queryClient = new QueryClient();

export const App = () => (
	<QueryClientProvider client={queryClient}>
		<ProjectPortalPage />;
	</QueryClientProvider>
);

export default App;
