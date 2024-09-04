import { Card, Typography, Button, Icon, Menu } from "@equinor/eds-core-react";
import { delete_to_trash, edit, more_vertical } from "@equinor/eds-icons";

import * as AllIcons from "@equinor/eds-icons";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { Portal } from "../../types";
import { usePortalContext } from "../../context/PortalContext";
import { useState } from "react";
import { tokens } from "@equinor/eds-tokens";

Icon.add(AllIcons);

const Style = {
  CardList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(100vh - 200px);
    overflow: auto;
  `,
  Card: styled(Card)<{ active: string }>`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    background: ${({ active }) => active};
    &:hover {
      background: ${tokens.colors.interactive.primary__hover_alt.hex};
    }
  `,
  Item: styled.a`
    cursor: pointer;
    text-decoration: none;
  `,
  Content: styled(Card.Content)`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `,
  IconWrapper: styled.div`
    background: #00707920;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    > svg {
      fill: #007079;
    }
  `,
  MenuButton: styled(Button)`
    position: absolute;
    right: 0px;
    top: 0px;
    margin: 1rem;
  `,

  Description: styled(Typography)`
    width: 600px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  AppIcon: styled.div`
    --app-icon-size: 1.5rem;
    --background-radius: 0.25rem;
    padding: 1rem;
    > svg {
      width: 30;
      height: 30;
    }
  `,
};

const { colors } = tokens;

const PortalCard = ({ portal }: { portal: Portal }) => {
  const { setActivePortalById, activePortalId } = usePortalContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Style.Item
      as={Link}
      to={`/portals/${portal.id}/overview`}
      onClick={(e) => {
        e.stopPropagation();
        setActivePortalById(portal.id);
      }}
    >
      <Style.Card
        active={
          portal.id === activePortalId
            ? colors.interactive.primary__selected_highlight.hex
            : ""
        }
      >
        <Style.IconWrapper>
          {portal.icon && Object.keys(AllIcons).includes(portal.icon) ? (
            <Icon name={portal.icon} size={48} />
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: `${portal.icon}`,
              }}
            />
          )}
        </Style.IconWrapper>
        <Style.Content>
          <Typography variant="h4">{portal.name}</Typography>
          <Style.Description variant="caption">
            Description: {portal.description}
          </Style.Description>
          {portal.contexts.length > 0 && (
            <Style.Description variant="caption">
              ContextsTypes: {portal.contexts.map((c) => c.type).join(" | ")}
            </Style.Description>
          )}
        </Style.Content>

        <Style.MenuButton
          ref={setAnchorEl}
          onClick={() => {
            openMenu();
          }}
          variant="ghost_icon"
        >
          <Icon data={more_vertical} />
        </Style.MenuButton>
        <Menu
          open={isOpen}
          id="menu-default"
          aria-labelledby="anchor-default"
          onClose={closeMenu}
          anchorEl={anchorEl}
          placement="left-start"
        >
          <Menu.Item
            as={Link}
            to={`/portals/${portal.id}/overview`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActivePortalById(portal.id);
            }}
          >
            <Icon
              data={edit}
              size={16}
              color={colors.text.static_icons__tertiary.hex}
            />
            <Typography group="navigation" variant="menu_title" as="span">
              Edit
            </Typography>
          </Menu.Item>
          <Menu.Section>
            <Menu.Item
              disabled
              onClick={() => {
                console.log("delete", portal.id);
              }}
            >
              <Icon
                data={delete_to_trash}
                size={16}
                color={colors.text.static_icons__tertiary.hex}
              />
              <Typography group="navigation" variant="menu_title" as="span">
                Delete
              </Typography>
            </Menu.Item>
          </Menu.Section>
        </Menu>
      </Style.Card>
    </Style.Item>
  );
};

export const PortalList = ({
  portalsData,
}: {
  portalsData: Portal[] | undefined;
}) => {
  return (
    <Style.CardList>
      {portalsData?.map((portal) => (
        <PortalCard key={portal.id} portal={portal} />
      ))}
    </Style.CardList>
  );
};
