import { defineAppManifest, mergeManifests } from '@equinor/fusion-framework-cli';

export default defineAppManifest((env, { base }) => {
	return mergeManifests(base, {
		displayName: 'Portal Administration',
		description: 'Portal Administration tool for fusion as a service',
	});
});
