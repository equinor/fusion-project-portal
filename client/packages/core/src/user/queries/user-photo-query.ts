import { IHttpClient } from '@equinor/fusion-framework-module-http';

export async function getUserPhotoById(client: IHttpClient, userId: string): Promise<string> {
	const res = await client.fetch(`/persons/${userId}/photo?api-version=2.0`);
	if (!res.ok) throw res;
	return URL.createObjectURL(await res.blob());
}
