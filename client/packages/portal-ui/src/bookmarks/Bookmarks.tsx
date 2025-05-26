import { Bookmark, useBookmarkComponentContext } from '@equinor/fusion-framework-react-components-bookmark';
import { PortalActionProps } from '@equinor/portal-core';
import { SideSheet } from '@equinor/fusion-react-side-sheet';
import { Button, Icon } from '@equinor/eds-core-react';


export function Bookmarks({ action, onClose, open }: PortalActionProps) {
  const { provider, showCreateBookmark } = useBookmarkComponentContext();

	return (
		<SideSheet isOpen={open} onClose={onClose} isDismissable={true} minWidth={action.minWidth}>
			<SideSheet.Indicator color={action.color} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={action.subTitle || ''} />
			<SideSheet.Actions>
				<Button
					disabled={!provider?.canCreateBookmarks}
					variant="ghost"
					onClick={() => {
						showCreateBookmark();
						onClose();
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

export default Bookmarks;
