import { ComponentRenderArgs } from '@equinor/fusion-framework-react-app';

import { render, unmountComponentAtNode } from 'react-dom';
import { AppComponent } from './App';

/** Render function */
export const renderApp = (el: HTMLElement, args: ComponentRenderArgs) => {
	const component = AppComponent(args);
	console.log('args', args.env.config);
	render(component, el);

	return () => {
		unmountComponentAtNode(el);
	};
};

export default renderApp;
