import { Icon, Menu } from '@equinor/eds-core-react';
import { useTelemetry } from '@equinor/portal-core';
import { FC, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StyledBreadcrumbItemInteract } from './styles';
import { arrow_drop_down } from '@equinor/eds-icons';
import { AppGroup } from '@portal/types';

interface AppBreadcrumbProp {
	appGroup: AppGroup | undefined;
	isMenuOpen: boolean;
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppBreadcrumb: FC<AppBreadcrumbProp> = ({ appGroup, isMenuOpen, setMenuOpen: toggleMenuOpen }) => {
	const { appKey } = useParams();
	const { dispatchEvent } = useTelemetry();

	const currentApp = appGroup?.apps.find((a) => a.appKey === appKey);

	const ref = useRef<HTMLSpanElement>(null);
	const hasApps = Boolean(appGroup?.apps.length);

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

			{appGroup && (
				<Menu
					open={isMenuOpen}
					placement="bottom-start"
					onMouseLeave={() => {
						toggleMenuOpen(false);
					}}
					anchorEl={ref.current}
				>
					{appGroup.apps.map((app) => (
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
									{ appKey, source: 'top-bar-navigation' }
								);
							}}
						>
							{currentApp?.appKey === app.appKey ? <b>{app.name}</b> : app.name}
						</Menu.Item>
					))}
				</Menu>
			)}
		</>
	);
};
