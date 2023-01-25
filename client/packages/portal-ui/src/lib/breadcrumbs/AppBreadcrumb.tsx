import { Menu } from "@equinor/eds-core-react";
import { AppGroup } from "@equinor/portal-core";
import { FC, useRef } from "react"
import { useParams } from "react-router-dom";
import { StyledBreadcrumbItem, StyledMenuItem } from "./styles";

interface AppBreadcrumbProp {
    appGroup: AppGroup | undefined;
    isMenuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppBreadcrumb: FC<AppBreadcrumbProp> = ({ appGroup, isMenuOpen, setMenuOpen: toggleMenuOpen }) => {
    const { appKey } = useParams();

    const currentApp = appGroup?.apps.find(a => a.appKey === appKey)

    const ref = useRef<HTMLSpanElement>(null)

    return <>
        {currentApp && <StyledBreadcrumbItem ref={ref} onClick={() => {
            toggleMenuOpen(s => !s)
        }}>{currentApp.name}</StyledBreadcrumbItem>}

        {appGroup &&
            <Menu
                open={isMenuOpen}
                placement="bottom-start"
                onMouseLeave={() => {
                    toggleMenuOpen(false);
                }}
                anchorEl={ref.current}>
                {appGroup.apps.map(app =>

                    <StyledMenuItem key={app.appKey} to={`/apps/${app.appKey}`}>
                        <Menu.Item onClick={() => {
                            toggleMenuOpen(false);
                        }}>
                            {app.name}
                        </Menu.Item>
                    </StyledMenuItem>

                )}
            </Menu>}
    </>

}