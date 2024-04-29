type AppsErrorType = 'not_found' | 'unauthorized' | 'unknown';

export class AppsLoadError extends Error {
	static fromHttpResponse(response: Response, options?: ErrorOptions) {
		switch (response.status) {
			case 401:
				return new AppsLoadError('unauthorized', 'failed to load apps, request not authorized', options);
			case 404:
				return new AppsLoadError('not_found', 'apps not found', options);
			default:
				return new AppsLoadError('unknown', `failed to load apps, status code ${response.status}`, options);
		}
	}

	constructor(public readonly type: AppsErrorType, message?: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'AppsLoadError';
	}
}
