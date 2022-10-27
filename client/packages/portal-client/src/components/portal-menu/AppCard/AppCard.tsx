import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { menuFavoritesController } from '@equinor/portal-core';
import { useObservable } from '@equinor/portal-utils';
import { useNavigate } from 'react-router-dom';
import { map } from 'rxjs';
import styled from 'styled-components';

type AppCardProps = {
  name: string;
};
export const AppCard = ({ name }: AppCardProps) => {
  const isFavorited = Boolean(
    useObservable(
      menuFavoritesController.favorites$.pipe(map((val) => val?.includes(name)))
    )
  );

  return (
    <StyledAppCard>
      <div>{name}</div>
      <StyledIcon
        onClick={() => menuFavoritesController.onClickFavorite(name)}
        name={isFavorited ? 'star_filled' : 'star_outlined'}
      />
    </StyledAppCard>
  );
};
const StyledIcon = styled(Icon)`
  visibility: hidden;
`;
const StyledAppCard = styled.div`
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${tokens.colors.ui.background__light.hex};
    ${StyledIcon} {
      visibility: visible;
    }
  }
`;
