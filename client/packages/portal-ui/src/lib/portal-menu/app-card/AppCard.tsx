import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { menuFavoritesController, useMenuContext } from '@equinor/portal-core';
import { useObservable } from '@equinor/portal-utils';
import { useNavigate } from 'react-router-dom';
import { map } from 'rxjs';
import styled from 'styled-components';

type AppCardProps = {
  name: string;
  appKey: string;
};
export const AppCard = ({ name, appKey }: AppCardProps) => {
  const { toggleMenu } = useMenuContext();
  const navigate = useNavigate();
  const isFavorited = Boolean(
    useObservable(
      menuFavoritesController.favorites$.pipe(
        map((val) => val?.includes(appKey))
      )
    )
  );

  return (
    <StyledAppCard
      id={`${appKey}-button`}
      title={`Application button for the application ${name}`}
      onClick={() => {
        toggleMenu();
        navigate(`/apps/${appKey}`);
      }}
    >
      <div>{name}</div>
      <StyledIcon
        id={`${appKey}-favorite-button`}
        title={`App favorite button for ${name}`}
        onClick={(event) => {
          event.stopPropagation();
          menuFavoritesController.onClickFavorite(appKey);
        }}
        name={isFavorited ? 'star_filled' : 'star_outlined'}
      />
    </StyledAppCard>
  );
};
const StyledIcon = styled(Icon)`
  visibility: hidden;
`;
const StyledAppCard = styled.button`
  background: none;
  border: none;
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
