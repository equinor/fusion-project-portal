export interface NotificationSettings {
	email: boolean;
	delayInMinutes: number;
	appConfig: AppConfig[];
}

export interface AppConfig {
	appKey: string;
	enabled: boolean;
}
