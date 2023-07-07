import { Bookmark } from '@equinor/fusion-framework-react-components-bookmark';
import { useHasBookmark } from '@equinor/fusion-framework-react-module-bookmark/portal';
import { PortalActionProps } from '@equinor/portal-core';

import { SideSheet } from '@equinor/fusion-react-side-sheet';
import { useFramework } from '@equinor/fusion-framework-react';
import { Button, Icon } from '@equinor/eds-core-react';

export function Bookmarks({ action, onClose, open }: PortalActionProps) {
	const hasBookmark = useHasBookmark();

	const { event } = useFramework().modules;

	return (
		<SideSheet
			isOpen={open}
			onClose={onClose}
			isDismissable={true}
			enableFullscreen={true}
			minWidth={action.minWidth}
		>
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
