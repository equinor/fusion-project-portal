import { Button, Card, Icon, Menu, Typography } from "@equinor/eds-core-react";
import React, { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { PortalApp } from "../../types";
import {
  edit,
  more_vertical,
  add_circle_filled,
  add_circle_outlined,
  remove_outlined,
} from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";

const Style = {
  Card: styled(Card)<{ col?: number }>`
    flex-direction: row;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2),
      0px 2px 4px -2px rgba(16, 24, 40, 0.2);
    padding: 0;
  `,
  Content: styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
  MenuButton: styled(Button)`
    position: absolute;
    right: 0px;
    top: 0px;
    margin: 1rem;
  `,
  Indicator: styled.div<{ active?: string }>`
    display: block;
    height: 16px;
    width: 16px;
    background-color: ${({ active }) =>
      active === "true"
        ? tokens.colors.interactive.success__resting.hex
        : tokens.colors.interactive.disabled__fill.hex};
    border-radius: 50%;
  `,
  Flex: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
};

const { colors } = tokens;

interface AppCardProps {
  app: PortalApp;
}

export const AppCard: React.FC<PropsWithChildren<AppCardProps>> = ({ app }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Style.Card>
      <Style.Content>
        <div>
          <Style.Flex>
            <Style.Indicator active={app.isActive?.toString()} />
            <div>
              <Typography variant="h4">{app.name}</Typography>
              <Typography>
                ContextTypes:{" "}
                {app.contexts.map((context) => context.type).join(" | ")}
              </Typography>
            </div>
          </Style.Flex>
        </div>
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
            disabled={app.isActive}
            onClick={() => {
              //
            }}
          >
            <Icon
              data={add_circle_outlined}
              size={16}
              color={colors.text.static_icons__tertiary.hex}
            />
            <Typography group="navigation" variant="menu_title" as="span">
              Activate
            </Typography>
          </Menu.Item>
          <Menu.Item
            disabled={app.isActive}
            onClick={() => {
              //
            }}
          >
            <Icon
              data={add_circle_filled}
              size={16}
              color={colors.text.static_icons__tertiary.hex}
            />
            <Typography group="navigation" variant="menu_title" as="span">
              Activate width context
            </Typography>
          </Menu.Item>
          <Menu.Item
            disabled={!app.isActive}
            onClick={() => {
              //
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
              disabled={!app.isActive}
              onClick={() => {
                console.log("delete", app.id);
              }}
            >
              <Icon
                data={remove_outlined}
                size={16}
                color={colors.text.static_icons__tertiary.hex}
              />
              <Typography group="navigation" variant="menu_title" as="span">
                Deactivate
              </Typography>
            </Menu.Item>
          </Menu.Section>
        </Menu>
      </Style.Content>
    </Style.Card>
  );
};
