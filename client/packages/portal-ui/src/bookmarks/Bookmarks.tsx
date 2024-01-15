import { BookmarkModule } from '@equinor/fusion-framework-module-bookmark';
import { Bookmark } from '@equinor/fusion-framework-react-components-bookmark';
import {} from '@equinor/fusion-framework-react-module-bookmark/portal';
import { PortalActionProps } from '@equinor/portal-core';

import { SideSheet } from '@equinor/fusion-react-side-sheet';
import { useFramework } from '@equinor/fusion-framework-react';
import { Button, Icon } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';

export function Bookmarks({ action, onClose, open }: PortalActionProps) {
	const { event, bookmark } = useFramework<[BookmarkModule]>().modules;

	const [hasBookmark, setHasBookmark] = useState(false);

	useEffect(() => {
		const subOnBookmarkChanged = event.addEventListener('onBookmarkChanged', () => {
			setHasBookmark(false);
		});
		const subOnAddCreator = event.addEventListener('onAddCreator', () => {
			setHasBookmark(true);
		});
		setHasBookmark(Object.keys(bookmark.bookmarkCreators).length > 0);
		return () => {
			subOnBookmarkChanged();
			subOnAddCreator();
			setHasBookmark(false);
		};
	}, [event]);

	return (
		<SideSheet isOpen={open} onClose={onClose} isDismissable={true} minWidth={action.minWidth}>
			<SideSheet.Indicator color={action.color} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={action.subTitle || ''} />
			<SideSheet.Actions>
				<Button
					disabled={!hasBookmark}
					variant="ghost"
					onClick={() => {
						onClose();
						event.dispatchEvent('onBookmarkOpen', { detail: true });
					}}
				>
					<Icon name="add" /> Add Bookmark
				</Button>
			</SideSheet.Actions>
			<SideSheet.Content>
				<Bookmark />
			</SideSheet.Content>
		</SideSheet>
	);
}
