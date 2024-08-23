import { Link, useMatch, type LinkProps } from "react-router-dom";
import { SideBar, SidebarLinkProps } from "@equinor/eds-core-react";

import {
  dashboard,
  build_wrench,
  briefcase,
  apps,
  desktop_mac,
  settings,
} from "@equinor/eds-icons";
import { usePortalContext } from "../context/PortalContext";
import { useMemo } from "react";

type MenuItemProps =
  | SidebarLinkProps &
      Partial<LinkProps> & {
        subItems?: MenuItemProps[];
        disabled?: boolean;
        expanded?: boolean;
      } & Pick<SidebarLinkProps, "active">;

export const SideMenu = () => {
  const { activePortalId } = usePortalContext();

  const menuItems: MenuItemProps[] = [
    {
      label: "Portals",
      icon: desktop_mac,
      active: !!useMatch(`portals`),
      to: `portals`,
      disabled: Boolean(!activePortalId),
      as: Link,
    },
    {
      label: "Portal",
      active: !!useMatch({ path: `portals/:portalId`, end: false }),
      icon: dashboard,
      disabled: Boolean(!activePortalId),
      expanded: true,
      subItems: [
        {
          label: "Config",
          icon: dashboard,
          to: `portals/${activePortalId}/overview`,
          active: !!useMatch(`portals/:portalId/overview`),
          disabled: Boolean(!activePortalId),
          as: Link,
        },
        {
          label: "Apps Config",
          icon: build_wrench,
          to: `portals/${activePortalId}/apps`,
          active: !!useMatch(`portals/:portalId/apps`),
          disabled: Boolean(!activePortalId),
          as: Link,
        },
        {
          label: "Router Config",
          icon: briefcase,
          to: `portals/${activePortalId}/router`,
          active: !!useMatch(`portals/:portalId/router`),
          disabled: Boolean(!activePortalId),
          as: Link,
        },
      ],
    },
    {
      label: "Settings",
      active: !!useMatch({ path: `settings`, end: false }),
      icon: settings,
      subItems: [
        {
          label: "Onboarded Apps",
          icon: apps,
          active: !!useMatch("settings/apps"),
          to: `settings/apps`,
          as: Link,
        },
        {
          label: "Context",
          icon: build_wrench,
          to: `settings/context`,
          active: !!useMatch(`settings/context`),
          as: Link,
        },
      ],
    },
  ];

  return (
    <SideBar open={true}>
      <SideBar.Content>
        <SideBar.Toggle />

        {menuItems.map((menuItem) => {
          if (menuItem.subItems && menuItem.subItems?.length > 0) {
            return (
              <SideBar.Accordion
                key={menuItem.label}
                active={Boolean(menuItem.active)}
                label={menuItem.label}
                icon={menuItem.icon}
                isExpanded={Boolean(menuItem.active)}
                disabled={menuItem.disabled}
              >
                {menuItem.subItems.map((menuItem) => (
                  <SideBar.AccordionItem
                    key={menuItem.label}
                    active={Boolean(menuItem.active)}
                    {...menuItem}
                  />
                ))}
              </SideBar.Accordion>
            );
          }
          return (
            <SideBar.Link
              key={menuItem.label}
              active={Boolean(menuItem.active)}
              disabled={menuItem.disabled}
              {...menuItem}
            ></SideBar.Link>
          );
        })}
      </SideBar.Content>
    </SideBar>
  );
};

export default SideMenu;
