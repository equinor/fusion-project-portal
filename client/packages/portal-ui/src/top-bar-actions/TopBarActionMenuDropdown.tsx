import { Checkbox, Menu } from '@equinor/eds-core-react';
import { PortalAction, usePortalActions, useTopBarActions } from '@equinor/portal-core';
import { useEffect, useRef, useState } from 'react';
import { TopBarAvatar } from '../avatar/TopBarAvatar';
import { TopBarActionItem } from './TopBarActionItem';

import { StyledItem, StyledTopBarButton } from './TopBarActionStyles';
import { useIsAdmin } from '../../../portal-core/src/admin/hooks/useIsAdmin';

export function TopBarActionMenuDropdown(): JSX.Element {
	const topBarMenuAnchorEl = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [actions, setActions] = useState<PortalAction[]>([]);
	const [allActionsChecked, setAllActionsChecked] = useState<boolean>(false);
	const [favorites, setFavorites] = useState<PortalAction[]>([]);

	const { actions$ } = usePortalActions();
	const { toggleTopBarAllActions, topBarActions$ } = useTopBarActions();
	const isAdmin = useIsAdmin();

	useEffect(() => {
		const actionsSubscription = actions$.subscribe(setActions);
		return () => {
			actionsSubscription.unsubscribe();
		};
	}, [actions$]);

	useEffect(() => {
		const topBarActionsSubscription = topBarActions$.subscribe((topBarActions) => {
			setAllActionsChecked(topBarActions.length === actions$.value.length);
			setFavorites(topBarActions);
		});
		return () => {
			topBarActionsSubscription.unsubscribe();
		};
	}, [actions$, topBarActions$]);

	const handleOnClick = () => {
		setIsOpen(true);
	};

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	return (
		<>
			<StyledTopBarButton
				ref={topBarMenuAnchorEl}
				onClick={isOpen ? handleCloseMenu : handleOnClick}
				variant="ghost_icon"
			>
				<TopBarAvatar />
			</StyledTopBarButton>
			<Menu
				id="menu-complex"
				aria-labelledby="anchor-complex"
				open={isOpen}
				anchorEl={topBarMenuAnchorEl.current}
				onClose={handleCloseMenu}
				placement="bottom-start"
			>
				{actions
					.filter((action) => !action.admin || (action.admin && isAdmin))
					.map((action) => (
						<span key={action.actionId}>
							<TopBarActionItem
								action={action}
								isFavorite={favorites.includes(action)}
								showAsMenu={true}
							/>
						</span>
					))}

				<Menu.Section title="Settings">
					<StyledItem>
						<Checkbox
							onChange={() => {
								toggleTopBarAllActions();
							}}
							checked={allActionsChecked}
							label=" Show icons in top bar"
						/>
					</StyledItem>
				</Menu.Section>
			</Menu>
		</>
	);
}
