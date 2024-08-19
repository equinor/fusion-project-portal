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
      } & Pick<SidebarLinkProps, "active">;

export const SideMenu = () => {
  const { activePortalId } = usePortalContext();

  const menuItems: MenuItemProps[] = [
    {
      label: "Portals",
      icon: desktop_mac,
      active: !!useMatch(`/`),
      to: `/`,
      as: Link,
    },
    {
      label: "Portal",
      active: !!useMatch({ path: `portal/:portalId`, end: false }),
      icon: dashboard,
      disabled: Boolean(!activePortalId),
      subItems: [
        {
          label: "Config",
          icon: dashboard,
          to: `portal/${activePortalId}/overview`,
          active: !!useMatch(`portal/:portalId/overview`),
          disabled: Boolean(activePortalId),
          as: Link,
        },
        {
          label: "Apps Config",
          icon: build_wrench,
          to: `portal/${activePortalId}/apps`,
          active: !!useMatch(`portal/:portalId/apps`),
          disabled: Boolean(activePortalId),
          as: Link,
        },
        {
          label: "Router Config",
          icon: briefcase,
          to: `portal/${activePortalId}/router`,
          active: !!useMatch(`portal/:portalId/router`),
          disabled: Boolean(activePortalId),
          as: Link,
        },
      ],
    },
    {
      label: "Settings",
      active: !!useMatch({ path: `portal/settings`, end: false }),
      icon: settings,
      subItems: [
        {
          label: "Onboarded Apps",
          icon: apps,
          active: !!useMatch({ path: `apps`, end: false }),
          to: `apps`,
          as: Link,
        },
        {
          label: "Onboarded Context",
          icon: build_wrench,
          to: `context`,
          active: !!useMatch(`context`),
          as: Link,
        },
        {
          label: "Context Types",
          icon: build_wrench,
          to: `context-types`,
          active: !!useMatch(`context-types`),
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
                key={menuItem.id}
                active={menuItem.active}
                label={menuItem.label}
                icon={menuItem.icon}
                isExpanded={menuItem.active}
                disabled={menuItem.disabled}
              >
                {menuItem.subItems.map((menuItem) => (
                  <SideBar.AccordionItem
                    key={menuItem.label}
                    active={menuItem.active}
                    {...menuItem}
                    disabled={menuItem.disabled}
                  />
                ))}
              </SideBar.Accordion>
            );
          }
          return (
            <SideBar.Link
              key={menuItem.label}
              active={menuItem.active}
              {...menuItem}
            ></SideBar.Link>
          );
        })}
      </SideBar.Content>
    </SideBar>
  );
};

export default SideMenu;
