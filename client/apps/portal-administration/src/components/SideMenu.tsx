import { Link, useMatch, type LinkProps } from 'react-router-dom';
import { SideBar, SidebarLinkProps } from '@equinor/eds-core-react';

import { dashboard, build_wrench, briefcase, apps, desktop_mac, settings, view_list, add } from '@equinor/eds-icons';
import { usePortalContext } from '../context/PortalContext';

type MenuItemProps =
	| SidebarLinkProps &
			Partial<LinkProps> & {
				subItems?: MenuItemProps[];
				disabled?: boolean;
				expanded?: boolean;
			} & Pick<SidebarLinkProps, 'active'>;

export const SideMenu = ({ isAdmin }: { isAdmin?: boolean }) => {
	const { activePortalId } = usePortalContext();

	const menuItems: MenuItemProps[] = [
		{
			label: 'Portals',
			icon: desktop_mac,
			active: !!useMatch(`portals`),
			to: `portals`,
			as: Link,
			subItems: [
				{
					label: 'Portals',
					icon: view_list,
					to: `portals`,
					active: !!useMatch(`portals`),
					as: Link,
				},
				{
					label: 'Create New Portal',
					icon: add,
					to: `portals/create`,
					active: !!useMatch(`portals/create`),
					as: Link,
				},
			],
		},
		{
			label: 'Portal',
			active: !!useMatch({ path: `portals/:portalId/:page`, end: true }),
			icon: dashboard,
			disabled: Boolean(!activePortalId),
			expanded: true,
			subItems: [
				{
					label: 'Overview',
					icon: dashboard,
					to: `portals/${activePortalId}/overview`,
					active: !!useMatch(`portals/:portalId/overview`),
					disabled: Boolean(!activePortalId),
					as: Link,
				},
				{
					label: 'Apps Config',
					icon: build_wrench,
					to: `portals/${activePortalId}/apps`,
					active: !!useMatch(`portals/:portalId/apps`),
					disabled: Boolean(!activePortalId),
					as: Link,
				},
				{
					label: 'Router Config',
					icon: briefcase,
					to: `portals/${activePortalId}/router`,
					active: !!useMatch(`portals/:portalId/router`),
					disabled: Boolean(!activePortalId),
					as: Link,
				},
				{
					label: 'Portal Config',
					icon: settings,
					to: `portals/${activePortalId}/show`,
					active: !!useMatch(`portals/:portalId/show`),
					disabled: Boolean(!activePortalId),
					as: Link,
				},
			],
		},
		{
			label: 'Settings',
			active: !!useMatch({ path: `settings`, end: false }),
			icon: settings,
			subItems: [
				{
					label: 'Onboarded Apps',
					icon: apps,
					active: !!useMatch({ path: `settings/apps`, end: true }),
					to: `settings/apps`,
					as: Link,
				},
				{
					label: 'Contexts',
					icon: build_wrench,
					to: `settings/contexts`,
					active: !!useMatch({ path: `settings/contexts`, end: true }),
					as: Link,
				},
				{
					label: 'Context Types',
					icon: build_wrench,
					to: `settings/contexts/types`,
					active: !!useMatch(`settings/contexts/types`),
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
