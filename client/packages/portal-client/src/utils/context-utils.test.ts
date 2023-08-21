import { describe, test, expect } from 'vitest';
import { replaceContextInPathname, verifyContextInURL } from './context-utils';

/**
 * Context can be found at 2 specific positions in the url this
 * is the 1 position in project page urls and the 2 position in the app urls
 *
 * ex.
 *
 * '/apps/handover/94dd5f4d-17f1-4312-bf75-ad75f4d9572c'
 *
 * and:
 *
 * '/project/94dd5f4d-17f1-4312-bf75-ad75f4d9572c'
 *
 */
describe('verifyContextInURL', () => {
	test('Should return context id from url on app path', () => {
		const path = 'apps/handover/94dd5f4d-17f1-4312-bf75-ad75f4d9572c';

		const context = verifyContextInURL(path);

		expect(context).toEqual('94dd5f4d-17f1-4312-bf75-ad75f4d9572c');
	});
	test('Should return context id from url on project path', () => {
		const path = 'project/94dd5f4d-17f1-4312-bf75-ad75f4d9572c';

		const context = verifyContextInURL(path);

		expect(context).toEqual('94dd5f4d-17f1-4312-bf75-ad75f4d9572c');
	});

	test('Should return context id from url when url start with /', () => {
		const path = '/apps/handover/94dd5f4d-17f1-4312-bf75-ad75f4d9572c';

		const context = verifyContextInURL(path);

		expect(context).toEqual('94dd5f4d-17f1-4312-bf75-ad75f4d9572c');
	});
	test('Should return null if guid present but context id is not present', () => {
		const path = '/apps/meetings/meeting/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/mom';

		const context = verifyContextInURL(path);

		expect(context).not.toEqual('94dd5f4d-17f1-4312-bf75-ad75f4d9572c');
		expect(context).toEqual(null);
	});
});

/**
 * Context should be replaced in utl if present but the url should be intact if not.
 */
describe('replaceContextInPathname', () => {
	test('Should return new path with provided context', () => {
		const path = 'apps/handover/94dd5f4d-17f1-4312-bf75-ad75f4d9572c';

		const pathWithContextReplaced = replaceContextInPathname('31b83a-b6cd-4267-89f3-db308edf721e', path);

		expect(pathWithContextReplaced).toEqual('apps/handover/31b83a-b6cd-4267-89f3-db308edf721e');
	});
	test('Should return same path if no context is percent', () => {
		const path = 'apps/meetings/';

		const pathWithContextReplaced = replaceContextInPathname('31b83a-b6cd-4267-89f3-db308edf721e', path);

		expect(pathWithContextReplaced).toEqual('apps/meetings/');
	});
	test('Should return same path if no context is percent and guid is used by application', () => {
		const path = '/apps/meetings/meeting/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/mom';

		const pathWithContextReplaced = replaceContextInPathname('31b83a-b6cd-4267-89f3-db308edf721e', path);

		expect(pathWithContextReplaced).toEqual('/apps/meetings/meeting/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/mom');
	});
});
