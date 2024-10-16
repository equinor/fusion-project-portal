import { lazy } from 'react';
import AppWrapperLegacy, { getLegacyFusion } from './LegacyAppWrapper';

import { AppConfig } from '@equinor/fusion-framework-module-app';
import { AppManifest as LegacyAppManifest } from '@equinor/fusion';

import LegacyAppContainer from '../legacy-interopt/LegacyAppContainer';
import { MessagePage } from './MessagePage';
export type LegacyEnv = {
	basename: string;
	config: AppConfig;
	manifest: LegacyAppManifest;
};

export const createLegacyAppLoader = (appKey: string) =>
	lazy(async () => {
		const appContainer = getLegacyFusion().app.container as LegacyAppContainer;
		const [basename] = window.location.pathname.match(/\/?apps\/[a-z|-]+\//) ?? [''];

		if (Object.keys(appContainer.allApps).length === 0) {
			await appContainer.getAllAsync();
		}

		const config = await appContainer.setCurrentAppAsync(appKey);

		if (!config) {
			return {
				default: () => <MessagePage type="Warning" title="No config" />,
			};
		}

		const env = {
			basename,
			config,
			manifest: { ...appContainer.currentApp } as LegacyAppManifest,
		};

		return {
			default: () => (
				<>
					<AppWrapperLegacy appKey={appKey} env={env} />
				</>
			),
		};
	});
