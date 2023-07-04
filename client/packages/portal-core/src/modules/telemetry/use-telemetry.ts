import { useFramework } from '@equinor/fusion-framework-react';
import { TelemetryModule } from './module';
import { ICustomProperties, IEventTelemetry } from '@microsoft/applicationinsights-web';

export const useTelemetry = () => {
	const fusion = useFramework<[TelemetryModule]>();
	const { client } = fusion.modules.telemetry;
	return {
		client,
		dispatchEvent: (event: IEventTelemetry, customProperties?: ICustomProperties | undefined) => {
			try {
				client.trackEvent(event, customProperties);
			} catch (error) {
				console.error(error);
			}
		},
	};
};
