
import { IBookmarkProvider } from '@equinor/fusion-framework-module-bookmark';
import { from, of } from 'rxjs';
export const BOOKMARK_ID_PARM = 'bookmarkId';

export function getBookmarkIdFromURL(searchParams: string): string | undefined {
  const params = new URLSearchParams(searchParams);
  return params.get(BOOKMARK_ID_PARM) || undefined;
}

export function initBookmarkUrlParams(provider: IBookmarkProvider) {
    const bookmarkId = getBookmarkIdFromURL(window.location.search);
    if (bookmarkId) {
        from(provider.setCurrentBookmark(bookmarkId)).subscribe()
    }
}