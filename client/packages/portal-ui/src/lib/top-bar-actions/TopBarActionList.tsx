import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { PortalAction, useTopBarActions } from '@equinor/portal-core';
import { Divider } from '@equinor/portal-ui';
import { useEffect, useState } from 'react';
import {
  StyledActionListWrapper,
  StyledActionMenuButton,
} from './TopBarActionStyles';

export function TopBarActionList(): JSX.Element {
  const { topBarActions$, setActiveActionById } = useTopBarActions();

  const [topBarActions, setTopBarActions] = useState<PortalAction[]>([]);

  useEffect(() => {
    const topBarActionsSubscription =
      topBarActions$.subscribe(setTopBarActions);
    return () => {
      topBarActionsSubscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {topBarActions.map((action, index) => {
        if (action.dropDownOnly) return <span key={action.actionId}></span>;
        const customIcon =
          typeof action.icon === 'string' ? (
            <Icon
              color={tokens.colors.interactive.primary__resting.hex}
              name={action.icon}
            />
          ) : (
            <action.icon />
          );
        return (
          <StyledActionListWrapper key={action.actionId}>
            <StyledActionMenuButton
              variant="ghost_icon"
              onClick={() => {
                action.onClick
                  ? action.onClick(action.actionId)
                  : setActiveActionById(action.actionId);
              }}
              title={action.name}
            >
              {customIcon}
            </StyledActionMenuButton>
            {action.appendDivider && !!topBarActions[index + 1] && <Divider />}
          </StyledActionListWrapper>
        );
      })}
      {topBarActions.length > 0 && <Divider />}
    </>
  );
}
