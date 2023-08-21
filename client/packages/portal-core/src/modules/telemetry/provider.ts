/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAuthProvider } from '@equinor/fusion-framework-module-msal';
import { ApplicationInsights, ITelemetryItem } from '@microsoft/applicationinsights-web';

import { ITelemetryConfigurator } from './configurator';

export interface ITelemetryProvider {
	createClient(): ApplicationInsights;
	client: ApplicationInsights;
}

export class TelemetryProvider implements ITelemetryProvider {
	client: ApplicationInsights;

	constructor(protected _config: ITelemetryConfigurator, protected _auth: IAuthProvider) {
		this.client = this.createClient();
	}

	createClient(): ApplicationInsights {
		const { instrumentationKey, connectionString, enableAutoRouteTracking, autoTrackPageVisitTime, customConfig } =
			this._config;

		const client = new ApplicationInsights({
			config: {
				connectionString,
				instrumentationKey,
				enableAutoRouteTracking,
				autoTrackPageVisitTime,
			},
		});

		client.loadAppInsights();

		if (this._auth && this._auth.defaultAccount) {
			// TODO - local or home account??
			client.setAuthenticatedUserContext(this._auth.defaultAccount.localAccountId);
		} else {
			console.warn('no authorized user provided!');
		}
		client.addTelemetryInitializer(this._addTelemetryInitializer.bind(this));

		if (customConfig?.trackPageView) {
			client.trackPageView();
		}

		if (customConfig?.aiCloudRole) {
			client.addTelemetryInitializer((envelope) => {
				(envelope.tags as any)['ai.cloud.role'] = customConfig?.aiCloudRole;
				(envelope.tags as any)['ai.cloud.roleInstance'] = customConfig?.aiCloudRole;
			});
		}
		return client;
	}

	protected _addTelemetryInitializer(item: ITelemetryItem): void | boolean {
		const { defaultTags } = this._config;
		defaultTags && Object.assign(item.tags ?? [], defaultTags);
	}
}
