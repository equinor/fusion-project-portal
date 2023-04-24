import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { View } from '../../types/view';

/** Get views from portal api */
export async function getViews(client: IHttpClient): Promise<View[]> {
	const res = await client.fetch(`/api/work-surfaces`);
	if (!res.ok) throw res;
	const views = (await res.json()) as View[];

	return views.map((v) => {
		switch (v.key) {
			case 'project':
				v.contextType = ['ProjectMaster'];
				break;
			case 'facility':
				v.contextType = ['Facility'];
				break;
			case 'contact':
				v.contextType = ['Contract'];
				break;

			default:
				v.contextType = [];
				break;
		}

		return v;
	});
}
