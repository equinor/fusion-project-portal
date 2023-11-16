import { AppModule, AppScriptModule, AppEnv } from '@equinor/fusion-framework-module-app';
import { Fusion } from '@equinor/fusion-framework-react';

export type RenderConfig = {
	fusion: Fusion<[AppModule]>;
	env: AppEnv<unknown, unknown>;
};

export const appRender = (args: { script?: AppScriptModule; element: HTMLDivElement; config: RenderConfig }) => {
	const { script, element, config } = args;

	if (!script) {
		throw Error('Render script is not provided');
	}

	const render = script.renderApp ?? script.default;

	if (render && typeof render === 'function') {
		return render(element, config);
	}
	throw Error('Application is not supported, no render function provided');
};
