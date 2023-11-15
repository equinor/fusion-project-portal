import { describe, test, expect, vi } from 'vitest';
import { createAppElement } from '../utils/app-element';
import { appRender } from './app-render';
import { Fusion } from '@equinor/fusion-framework-react';
import { AppModule, AppScriptModule } from '@equinor/fusion-framework-module-app';

describe('appRender', () => {
	const config = {
		env: {},
		fusion: { modules: {} } as Fusion<[AppModule]>,
	};
	test('Should return true if apps is in path', () => {
		const element = createAppElement();
		const renderApp = vi.fn();
		const script: AppScriptModule = {
			renderApp,
			default: renderApp,
		};

		appRender({
			element,
			script,
			config,
		});
		expect(renderApp).toBeCalled();
		expect(renderApp).toBeCalledTimes(1);
		expect(renderApp).toBeCalledWith(element, config);
	});

	test('Should return true if apps is in path2', () => {
		const element = createAppElement();

		const script = {
			renderApp: undefined,
			default: undefined,
		} as unknown as AppScriptModule;

		expect(() =>
			appRender({
				element,
				script,
				config,
			})
		).toThrowError('Application is not supported, no render function provided');
	});
	test('Should return true if apps is in path3', () => {
		const element = createAppElement();
		expect(() =>
			appRender({
				element,
				config,
			})
		).toThrowError('Render script is not provided');
	});
});
