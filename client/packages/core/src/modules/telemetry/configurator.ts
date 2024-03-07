export interface ITelemetryConfigurator {
	instrumentationKey?: string;
	defaultTags?: Record<string, string>;
	enableAutoRouteTracking?: boolean;
	connectionString?: string;
	customConfig?: CustomConfig;
	autoTrackPageVisitTime?: boolean;
	addConfig(config: Partial<ITelemetryConfigurator>): void;
}

type CustomConfig = {
	aiCloudRole?: string;
	trackPageView?: boolean;
};

export class TelemetryConfigurator implements ITelemetryConfigurator {
	instrumentationKey?: string;

	connectionString?: string;

	defaultTags?: Record<string, string>;

	customConfig?: CustomConfig;

	public addConfig(config: ITelemetryConfigurator) {
		this.instrumentationKey = config.instrumentationKey;
		this.connectionString = config.connectionString;
		this.customConfig = config.customConfig;
		this.defaultTags = config.defaultTags;
	}
}
