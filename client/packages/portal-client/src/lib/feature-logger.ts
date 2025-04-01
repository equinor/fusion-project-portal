/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppManifest, AppModule } from '@equinor/fusion-framework-module-app';
import { ContextItem } from '@equinor/fusion-framework-module-context';
import { Fusion } from '@equinor/fusion-framework-react';
import { retry } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const getSessionId = () => {
	const FUSION_SESSION_ID = 'FUSION_SESSION_ID';
	const existingSessionId = sessionStorage.getItem(FUSION_SESSION_ID);

	if (existingSessionId) {
		return existingSessionId;
	}

	const newSessionId = uuidv4();
	sessionStorage.setItem(FUSION_SESSION_ID, newSessionId);
	return newSessionId;
};

export type FeatureLogEntry = {
	appKey?: string | null;
	contextId?: string | null;
	contextName?: string | null;
	feature: string;
	featureVersion: string;
	payload?: any;
	metadata: { [key: string]: any };
	dateTimeUtc: Date;
	url: string | null;
};

export type FeatureLogEntryRequest = {
	appKey: string | null;
	contextId: string | null;
	contextName: string | null;
	feature: string;
	featureVersion: string;
	payload: string | null;
	metadata: string | null;
	dateTimeUtc: string;
	url: string | null;
};

export type FeatureLogBatch = {
	sessionId: string;
	entries: FeatureLogEntryRequest[];
};

const getSelectedAppPayload = (selectedApp: { key: string | null; name: string | null }) => ({
	selectedApp,
	previousApps: [],
});

const getPayloadByType = (
	type: 'App selected' | 'Context selected',
	app?: AppManifest,
	context?: ContextItem | null
) => {
	if (type === 'App selected') {
		return JSON.stringify(getSelectedAppPayload({ key: app?.appKey || null, name: app?.displayName || null }));
	} else if (type === 'Context selected') {
		return JSON.stringify({ selectedContext: context });
	}
	return null;
};

const getMetaData = () => {
	return JSON.stringify({
		screen: {
			availableWidth: window.screen.availWidth,
			availableHeight: window.screen.availHeight,
			width: window.innerWidth,
			height: window.innerHeight,
			orientation:
				'orientation' in window.screen && window.screen.orientation
					? window.screen.orientation.type
					: 'unknown',
		},
	});
};

const getEntry = (
	type: 'App selected' | 'Context selected',
	app?: AppManifest,
	context?: ContextItem
): FeatureLogEntryRequest | undefined => {
	return {
		appKey: app?.appKey || null,
		contextId: context?.id || null,
		feature: type,
		featureVersion: '0.0.1',
		contextName: context?.title || null,
		dateTimeUtc: new Date().toUTCString(),
		payload: getPayloadByType(type, app, context),
		metadata: getMetaData(),
		url: window.location.href,
	};
};

export class FeatureLogger {
	private entries: FeatureLogEntryRequest[] = [];

	private state: 'sending' | 'idle' = 'idle';

	private timer: NodeJS.Timeout | null = null;

	private manifest: AppManifest | undefined = undefined;

	private context: ContextItem | undefined = undefined;


	constructor(private fusion: Omit<Fusion<[AppModule]>['modules'], 'dispose'>) {
		this.fusion.event.addEventListener('onAppManifestLoaded', (e) => {

			if (this.manifest?.appKey === e.detail.manifest.appKey) return;
			this.manifest = e.detail.manifest;
			console.log('App selected');
			this.log('App selected');
		});
		this.fusion.event.addEventListener('onCurrentContextChanged', (e) => {

			if (this.context?.id === e.detail.next?.id) return;
			this.context = e.detail.next || undefined;
			if (e.detail.next) this.log('Context selected');
		});
	}

	public log = (type: 'App selected' | 'Context selected') => {
		console.log('dispatching logs', type, this.entries);
		const entire = getEntry(type, this.manifest, this.context);
		if (entire && !this.entries.find((e) => e.dateTimeUtc.toString() === entire.dateTimeUtc.toString())) {
			this.entries.push(entire);
		}
		try {
			this.scheduleDispatch(type);
		} catch (error) {
			// suppress error
		}
	};

	private scheduleDispatch = (type: string) => {
		if (this.timer) {
			clearTimeout(this.timer);
		}

		if (this.entries.length >= 3) {
			try {
				this.dispatchLogs(type);
				return
			} catch (error) {
				// suppress error
			}
			return;
		}
		this.timer = setTimeout(async () => {
			try {
				this.dispatchLogs(type);

			} catch (error) {
				// suppress error
			}
		}, 5000);
	};

	private dispatchLogs = async (type: string) => {

		if (this.entries.length === 0) {
			return;
		}

		if (this.state === 'sending') {
			try {

				this.scheduleDispatch(type);
				return
				} catch (error) {
					// suppress error
				}
			return;
		}

		this.state = 'sending';

		const client = await this.fusion.serviceDiscovery.createClient('portal');
		const body: FeatureLogBatch = {
			sessionId: getSessionId(),
			entries: this.entries,
		};

		try {
			await client.fetch('/log/features', {
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
				method: 'POST',
			});
			this.entries = this.entries.filter(
				(e) => !body.entries.find((sentEntry) => sentEntry.dateTimeUtc.toString() === e.dateTimeUtc.toString())
			);
			this.state = 'idle';
		} catch (error) {
			this.state = 'idle';
			console.log(error);
		}
	};
}
