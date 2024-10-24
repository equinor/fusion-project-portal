import { Icon, Menu } from '@equinor/eds-core-react';
import { AppCategory, useTelemetry } from '@portal/core';
import { FC, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StyledBreadcrumbItemInteract } from './styles';
import { arrow_drop_down } from '@equinor/eds-icons';

interface AppBreadcrumbProp {
	appCategory: AppCategory | undefined;
	isMenuOpen: boolean;
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppBreadcrumb: FC<AppBreadcrumbProp> = ({ appCategory, isMenuOpen, setMenuOpen: toggleMenuOpen }) => {
	const { appKey } = useParams();
	const { dispatchEvent } = useTelemetry();

	const currentApp = appCategory?.apps.find((a) => a.appKey === appKey);

	const ref = useRef<HTMLSpanElement>(null);
	const hasApps = Boolean(appCategory?.apps.length);

	return (
		<>
			{currentApp && (
				<StyledBreadcrumbItemInteract
					ref={ref}
					onClick={() => {
						toggleMenuOpen((s) => !s);
					}}
				>
					<b>{currentApp.name}</b>
					{hasApps && <Icon data={arrow_drop_down} />}
				</StyledBreadcrumbItemInteract>
			)}

			{appCategory && (
				<Menu
					open={isMenuOpen}
					placement="bottom-start"
					onMouseLeave={() => {
						toggleMenuOpen(false);
					}}
					anchorEl={ref.current}
				>
					{appCategory.apps.map((app) => (
						<Menu.Item
							as={Link}
							key={app.appKey}
							to={`/apps/${app.appKey}/`}
							onClick={() => {
								toggleMenuOpen(false);
								dispatchEvent(
									{
										name: 'onAppNavigation',
									},
									{ appKey: app.appKey, source: 'top-bar-navigation' }
								);
							}}
						>
							{currentApp?.appKey === app.appKey ? <b>{app.displayName}</b> : app.displayName}
						</Menu.Item>
					))}
				</Menu>
			)}
		</>
	);
};
