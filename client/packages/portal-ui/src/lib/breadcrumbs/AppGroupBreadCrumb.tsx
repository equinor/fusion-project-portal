import { FC } from "react"
import { StyledBreadcrumbItem } from "./styles"

export const AppGroupBreadCrumb: FC<{ name: string }> = ({ name }) => name ? (
    <StyledBreadcrumbItem>{name}</StyledBreadcrumbItem>
) : null;

