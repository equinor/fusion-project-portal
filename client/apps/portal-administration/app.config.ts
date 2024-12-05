import { defineAppConfig } from '@equinor/fusion-framework-cli';

const feature = true;
export default defineAppConfig((_env) => ({
	environment: {
		client: feature
			? {
					baseUri: 'https://backend-fusion-project-portal-feature.radix.equinor.com',
					defaultScopes: ['api://7bf96dd1-39fe-47dd-8286-329c730ac76b/access_as_user'],
			  }
			: {
					baseUri: 'https://backend-fusion-project-portal-test.radix.equinor.com',
					defaultScopes: ['api://02f3484c-cad0-4d1d-853d-3a9e604b38f3/access_as_user'],
			  },
	},
}));
