import { IHttpClient } from '@equinor/fusion-framework-react/http';

export type BookmarkResponse<TPayload extends unknown = unknown> = {
  bookmarkId: string;
} & BookmarkRequest<TPayload>;

export type BookmarkRequest<TPayload extends unknown = unknown> = {
  /** Title for bookmark. Max x amount of characters? */
  name: string;
  /** Longer description than title */
  description?: string;
  /** If it's shared then other people are able to use it */
  isShared: boolean;
  /** Can be used when having bookmarks globally available from portal */
  appKey?: string;
  /** Not relevant at the moment */
  contextId?: string;
  /** Can be anything. For now, only FilterToSave */
  payload: TPayload;
  /** Specific for JC portal */
  sourceSystem?: SourceSystem;
};

export type SourceSystem = {
  /**E.g. "Castberg-portal" */
  name: string;
  /** E.g "cst-portal-1212" */
  identifier: string;
  /** E.g "ConstructionAndCommissioning" */
  subSystem: string;
};

/**Creates an api client for bookmarks */
export const createBookmarkClient = (client: IHttpClient) => {
  client.requestHandler.setHeader('api-version', '1.0');
  client.responseHandler.set('throw-on-not-ok', (res) => {
    if (!res.ok) throw res;
  });
  return {
    delete: async (id: string): Promise<Response> =>
      await client.fetch(`bookmarks/${id}`, {
        method: 'DELETE',
      }),
    share: async (id: string) =>
      createBookmarkClient(client).patch(id, {
        bookmarkId: id,
        isShared: true,
      }),
    unShare: async (id: string) =>
      createBookmarkClient(client).patch(id, {
        bookmarkId: id,
        isShared: false,
      }),
    patch: async (
      id: string,
      body: Partial<BookmarkResponse>
    ): Promise<Response> =>
      await client.fetch(`bookmarks/${id}`, {
        body: JSON.stringify(body),
        method: 'PATCH',
      }),
    favourite: async (id: string): Promise<Response> =>
      await client.fetch(`persons/me/bookmarks/favourites`, {
        body: JSON.stringify({ bookmarkId: id }),
        method: 'POST',
      }),
    unFavourite: async (id: string): Promise<Response> =>
      await client.fetch(`persons/me/bookmarks/favourites/${id}`, {
        method: 'DELETE',
      }),
    /** Used for applying payload */
    applyBookmark: async <T>(
      id: string,
      signal?: AbortSignal
    ): Promise<BookmarkResponse<T>> =>
      (await client.fetch(`bookmarks/${id}/apply`, { signal })).json(),
    getById: async <T>(
      id: string,
      signal?: AbortSignal
    ): Promise<BookmarkResponse<T>> =>
      await (await client.fetch(`bookmarks/${id}`, { signal })).json(),
    headBookmark: async (id: string, signal?: AbortSignal) =>
      await client.fetch(`persons/me/bookmarks/favourites/${id}`, {
        method: 'HEAD',
        signal,
      }),
    postBookmark: async (req: BookmarkRequest) =>
      client.fetch(`bookmarks`, {
        method: 'POST',
        body: JSON.stringify(req),
      }),
    //With filters
    // getAll: async (signal?: AbortSignal) => {},
  };
};
