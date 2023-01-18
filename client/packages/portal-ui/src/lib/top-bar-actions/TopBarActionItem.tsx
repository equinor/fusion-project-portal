import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import {
  PortalAction,
  usePortalActions,
  useTopBarActions,
} from '@equinor/portal-core';
import { MouseEvent } from 'react';

import { StyledActionFavoriteButton, StyledMenuItem, StyledTopBarButton } from './TopBarActionStyles';

interface TopBarActionItemProps {
  action: PortalAction;
  isFavorite: boolean;
  showAsMenu?: boolean;
}

export function TopBarActionItem({
  action,
  isFavorite,
  showAsMenu
}: TopBarActionItemProps) {
  const { setActiveActionById } = usePortalActions();
  const { toggleActionById } = useTopBarActions();

  if (action.topParOnly) return null;

  const customIcon =
    typeof action.icon === 'string' ? (
      <Icon
        name={action.icon}
        size={16}
        color={tokens.colors.text.static_icons__tertiary.hex}
      />
    ) : (
      !showAsMenu ? <action.icon.component /> : <Icon
        name={action.icon.name}
        size={16}
        color={tokens.colors.text.static_icons__tertiary.hex}
      />
    );

  return (
    <StyledMenuItem
      onClick={() => {
        action.onClick
          ? action.onClick(action.actionId)
          : setActiveActionById(action.actionId);
      }}
      title={action.name}
    >
      {customIcon}
      <Typography group="navigation" variant="menu_title" as="span">
        {action.name}
      </Typography>
      {!action.dropDownOnly && (
        <StyledActionFavoriteButton
          onClick={(e: MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation();
            toggleActionById(action.actionId);
          }}
        >
          <Icon
            name={isFavorite ? 'star_filled' : 'star_outlined'}
            size={16}
            color={tokens.colors.text.static_icons__tertiary.hex}
          />
        </StyledActionFavoriteButton>
      )}
    </StyledMenuItem>
  );
}
