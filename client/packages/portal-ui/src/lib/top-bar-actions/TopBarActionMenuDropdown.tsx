import { Checkbox, Icon, Menu, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import {
  PortalAction,
  usePortalActions,
  useTopBarActions,
} from '@equinor/portal-core';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { TopBarAvatar } from '../avatar/TopBarAvatar';

import {
  StyledItem,
  StyledMenuItem,
  StyledTopBarButton,
} from './TopBarActionStyles';

export function TopBarActionMenuDropdown(): JSX.Element {
  const topBarMenuAnchorEl = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [actions, setActions] = useState<PortalAction[]>([]);
  const [allActionsChecked, setAllActionsChecked] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<PortalAction[]>([]);

  const { actions$, setActiveActionById } = usePortalActions();
  const { toggleTopBarAllActions, toggleActionById, topBarActions$ } =
    useTopBarActions();

  useEffect(() => {
    const actionsSubscription = actions$.subscribe(setActions);
    return () => {
      actionsSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const topBarActionsSubscription = topBarActions$.subscribe(
      (topBarActions) => {
        setAllActionsChecked(topBarActions.length === actions$.value.length);
        setFavorites(topBarActions);
      }
    );
    return () => {
      topBarActionsSubscription.unsubscribe();
    };
  }, []);

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
        {actions.map((action) => {
          if (action.topParOnly) return <span key={action.actionId}></span>;

          const customIcon =
            typeof action.icon === 'string' ? (
              <Icon
                name={action.icon}
                size={16}
                color={tokens.colors.text.static_icons__tertiary.hex}
              />
            ) : (
              <action.icon />
            );

          return (
            <StyledMenuItem
              onClick={() => {
                action.onClick
                  ? action.onClick(action.actionId)
                  : setActiveActionById(action.actionId);
              }}
              title={action.name}
              key={action.actionId}
            >
              {customIcon}
              <Typography group="navigation" variant="menu_title" as="span">
                {action.name}
              </Typography>
              {!action.dropDownOnly && (
                <StyledTopBarButton
                  variant="ghost_icon"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    toggleActionById(action.actionId);
                  }}
                >
                  <Icon
                    name={
                      favorites.includes(action)
                        ? 'star_filled'
                        : 'star_outlined'
                    }
                    size={16}
                    color={tokens.colors.text.static_icons__tertiary.hex}
                  />
                </StyledTopBarButton>
              )}
            </StyledMenuItem>
          );
        })}

        <Menu.Section title="Settings">
          <StyledItem>
            <Checkbox
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
