import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { usePresenceQuery } from '@equinor/portal-core';

import { getPresenceInfo } from './parsePresenceStatus';
import { StyledStatusIconOverAvatar } from './top-bar-avatar.styles';

export const TopBarAvatar = (): JSX.Element | null => {
  const { data, isLoading, error } = usePresenceQuery();

  if (isLoading) {
    return (
      <Icon
        color={tokens.colors.interactive.primary__resting.hex}
        name="account_circle"
      />
    );
  }

  if (error || !data)
    return (
      <Icon
        color={tokens.colors.interactive.warning__resting.hex}
        name="error_outlined"
      />
    );

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
