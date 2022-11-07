import { Icon, Popover } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';
import { getPresenceInfo } from './parsePresenceStatus';
import {
  StyledInfoText,
  StyledStatusIconOverAvatar,
  StyledUserName,
  StyledWrapper,
  StyledPresence,
} from './top-bar-avatar.styles';
import { usePresence } from '../queries';

export const TopBarAvatar = (): JSX.Element | null => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);
  const user = useCurrentUser();

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
    <div>
      <div style={{ position: 'relative' }} ref={ref} onClick={open}>
        <Icon
          color={tokens.colors.interactive.primary__resting.hex}
          name="account_circle"
        />

        <StyledStatusIconOverAvatar>
          {presenceInfo.icon}
        </StyledStatusIconOverAvatar>
      </div>
      <Popover anchorEl={ref.current} open={isOpen} onClose={close}>
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
      </Popover>
    </div>
  );
};
