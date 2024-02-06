import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { YammerLogo } from './YammerLogo.svg';

export const Styled = {
  Yammer: styled.div`
    background: ${tokens.colors.ui.background__default.hex};
    display: flex;
    padding: ${tokens.spacings.comfortable.medium};
    align-items: center;

    & > *:last-child {
      margin-left: auto;
    }

    h4 {
      display: inline;
      font-weight: 500;
      font-size: ${tokens.typography.paragraph.body_long.fontSize};
      padding: 0 ${tokens.spacings.comfortable.small};
    }
  `,
};

export const FusionYammer = (): JSX.Element => {
  const handleOnclick = () => {
    window.open('https://www.yammer.com/statoil.com/#/threads/inGroup?type=in_group&feedId=14348440');
  };

  return (
    <Styled.Yammer>
      <YammerLogo></YammerLogo>
      <h4>Fusion Yammer page</h4>
      <Tooltip title="Go to Fusion Yammer page (Opens in new tab)" placement="top">
        <Button onClick={handleOnclick} variant="ghost_icon" aria-label="open Yammer in new tab">
          <Icon data={external_link} />
        </Button>
      </Tooltip>
    </Styled.Yammer>
  );
};

export default FusionYammer;
