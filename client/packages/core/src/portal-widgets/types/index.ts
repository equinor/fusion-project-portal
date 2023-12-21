import { FunctionComponent } from 'react';
import { PortalAction } from '@equinor/portal-core';

export type PortalWidget = PortalReactComponent | PortalWidgetLoader | PortalActionWidget;

export type PortalReactComponent = {
	type: 'PortalReactComponent';
	button?: React.FC<{ setActiveActionById: (id: string) => void }>;
	component?: FunctionComponent<PortalWidgetProps>;
} & PortalWidgetBase;

export type PortalWidgetLoader = {
	type: 'PortalWidgetLoader';
	widgetId: string;
} & PortalWidgetBase;

export type PortalActionWidget = {
	type: 'PortalActionWidget';
	onClick?: (id: string) => void;
} & PortalWidgetBase;

type HEXString = `#${string}`;

export type PortalWidgetProps = {
	open: boolean;
	onClose: VoidFunction;
	widget?: PortalWidget;
	action: PortalAction;
};

export interface PortalWidgetBase {
	type: WidgetType;
	id: string;
	name: string;
	subTitle?: string;
	color?: HEXString;
	minWidth?: number;
	icon?: string | { component: React.FC; name: string };
	tooltip?: React.ReactNode;
	uiConfig?: PortalWidgetUIConfig;
}

export type PortalWidgetUIConfig = {
	appendDivider?: boolean;
	dropDownOnly?: boolean;
	topBarOnly?: boolean;
};

export type WidgetType = 'PortalWidgetLoader' | 'PortalActionWidget' | 'PortalReactComponent';
