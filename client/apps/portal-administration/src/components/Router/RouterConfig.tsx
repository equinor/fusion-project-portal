import { useRouterConfigContext } from '../../context/RouterContext';
import { Code } from '../../utils/syntaxHighlightJson';

export const RouterConfig = () => {
	const { root, routes } = useRouterConfigContext();
	const config = {
		root,
		routes,
	};
	return <Code config={config} />;
};
