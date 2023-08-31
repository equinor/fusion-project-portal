import { useIsAdmin } from '../hooks/useIsAdmin';
export const Admin = () => {
	const isAdmin = useIsAdmin();
	return <p>{isAdmin ? 'True' : 'False'}</p>;
};
