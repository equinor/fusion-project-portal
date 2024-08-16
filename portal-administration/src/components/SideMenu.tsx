import { Link, useMatch, type LinkProps } from "react-router-dom";
import { Icon, SideBar, SidebarLinkProps } from "@equinor/eds-core-react";

import {
  dashboard,
  code,
  comment_notes,
  build_wrench,
  briefcase,
  view_agenda,
  apps,
  desktop_mac,
} from "@equinor/eds-icons";
import { usePortalContext } from "../context/PortalContext";

import { useState } from "react";

type MenuItemProps =
  | SidebarLinkProps &
      Partial<LinkProps> & {
        subItems?: MenuItemProps[];
        disabled?: boolean;
      } & Pick<SidebarLinkProps, "active">;

export const SideMenu = () => {
  Icon.add({ code, comment_notes, build_wrench, briefcase });

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
      active: !!useMatch(`portal/:portalId/context`),
      as: Link,
    },
  ];

  const [selected, setSelected] = useState<string>("");

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
