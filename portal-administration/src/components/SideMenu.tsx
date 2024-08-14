import { Link, useMatch, type LinkProps } from "react-router-dom";
import { Icon, SideBar, SidebarLinkProps } from "@equinor/eds-core-react";
import {
  dashboard,
  code,
  comment_notes,
  build_wrench,
  briefcase,
  view_agenda,
} from "@equinor/eds-icons";

type MenuItemKey = "overview" | "router" | "portals" | "apps" | "context";
type MenuItemProps = SidebarLinkProps &
  LinkProps & { id: MenuItemKey } & Pick<SidebarLinkProps, "active">;

export const SideMenu = () => {
  Icon.add({ code, comment_notes, build_wrench, briefcase });

  const menuItems: MenuItemProps[] = [
    {
      label: "Overview",
      icon: dashboard,
      to: `overview`,
      active: !!useMatch(`portal/:portalId/overview`),
      as: Link,
      id: "overview",
    },
    {
      label: "Router",
      icon: briefcase,
      to: `router`,
      active: !!useMatch(`portal/:portalId/router`),
      as: Link,
      id: "router",
    },
    // {
    //   label: "Config",
    //   icon: code,
    //   to: `config`,
    //   active: !!useMatch(`config`),
    //   as: Link,
    //   id: "config",
    // },
    {
      label: "Context",
      icon: build_wrench,
      to: `context`,
      active: !!useMatch(`portal/:portalId/context`),
      as: Link,
      id: "context",
    },
    {
      label: "Apps",
      icon: build_wrench,
      to: `apps`,
      active: !!useMatch(`portal/:portalId/apps`),
      as: Link,
      id: "apps",
    },
    {
      label: "Portals",
      icon: view_agenda,
      to: `/`,
      as: Link,
      id: "portals",
    },
  ];

  return (
    <SideBar open={true}>
      <SideBar.Content>
        <SideBar.Toggle />

        {menuItems.map((menuItem) => (
          <SideBar.Link
            key={menuItem.id}
            active={menuItem.active}
            {...menuItem}
          />
        ))}
      </SideBar.Content>
    </SideBar>
  );
};

export default SideMenu;
