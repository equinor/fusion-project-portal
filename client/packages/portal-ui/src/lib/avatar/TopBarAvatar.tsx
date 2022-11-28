import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { usePresence } from '@equinor/portal-core';

import { getPresenceInfo } from './parsePresenceStatus';
import { StyledStatusIconOverAvatar } from './top-bar-avatar.styles';

export const TopBarAvatar = (): JSX.Element | null => {
  const { data, isLoading, error } = usePresence();

  if (isLoading) {
    return (
      <Icon
        color={tokens.colors.interactive.primary__resting.hex}
        name="account_circle"
      />
    );
  }
  //TODO: make component
  if (error || !data) return <div>Error</div>;

  const presenceInfo = getPresenceInfo(data.availability);
  return (
    <div style={{ position: 'relative' }}>
      <Icon
        color={tokens.colors.interactive.primary__resting.hex}
        name="account_circle"
      />

      <StyledStatusIconOverAvatar>
        {presenceInfo.icon}
      </StyledStatusIconOverAvatar>
    </div>
  );
};

{
  /* <Popover anchorEl={ref.current} open={isOpen} onClose={close}>
        <Popover.Content>
          <StyledWrapper>
            <div>
              <StyledInfoText>Signed in as</StyledInfoText>
              <StyledUserName>{user?.username}</StyledUserName>
              <StyledPresence>
                <div>{presenceInfo.icon} </div>
                <div>{presenceInfo.status}</div>
              </StyledPresence>
            </div>
          </StyledWrapper>
        </Popover.Content>
      </Popover> */
}
