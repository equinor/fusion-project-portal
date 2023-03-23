import { SideSheetHeader } from '../side-sheet-header/SideSheetHeader';
import { BookmarkWidget } from '@equinor/bookmark';

export function Bookmarks() {
	return (
		<SideSheetHeader title="Bookmarks" subTitle={'Application bookmarks'} color={'#258800'}>
			<BookmarkWidget />
		</SideSheetHeader>
	);
}
