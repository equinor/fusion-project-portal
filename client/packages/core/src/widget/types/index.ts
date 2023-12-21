import { FunctionComponent } from 'react';

export type PortalService = PortalReactComponent | PortalWidget | PortalAction;

export type PortalReactComponent = {
	type: 'PortalReactComponent';
	button?: React.FC<{ setActiveActionById: (id: string) => void }>;
	component?: FunctionComponent<PortalWidgetProps>;
} & PortalWidgetBase;

export type PortalWidget = {
	type: 'PortalWidget';
	widgetId: string;
} & PortalWidgetBase;

export type PortalAction = {
	type: 'PortalActionWidget';
	onClick?: (id: string) => void;
} & PortalWidgetBase;

type HEXString = `#${string}`;

export type PortalWidgetProps = {
	open: boolean;
	onClose: VoidFunction;
	widget?: PortalService;
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

export type WidgetType = 'PortalWidget' | 'PortalAction' | 'PortalReactComponent';
