import { HEXString } from '@equinor/fusion-react-side-sheet';
import React, { FunctionComponent } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PortalAction {
	actionId: string;
	name: string;
	subTitle?: string;
	color?: HEXString;
	minWidth?: number;
	icon?: string | { component: React.FC; name: string };
	button?: React.FC<{ setActiveActionById: (id: string) => void }>;
	onClick?: (actionId: string) => void;
	tooltip?: React.ReactNode;
	component?: FunctionComponent<PortalActionProps>;
	widgetId?: string;
	appendDivider?: boolean;
	dropDownOnly?: boolean;
	topParOnly?: boolean;
}

export type PortalActionProps = { open: boolean; onClose: VoidFunction; action: PortalAction };

export interface PortalActions {
	actions$: BehaviorSubject<PortalAction[]>;
	configureActions: (actions: PortalAction[]) => void;
	activeAction$: BehaviorSubject<PortalAction | undefined>;
	setActiveActionById(actionId: string): void;
	closeActiveAction(): void;
}

export interface PortalTopBarActions {
	topBarActionsIds$: {
		obs$: Observable<string[]>;
		next: (value: string[]) => void;
		subject$: BehaviorSubject<string[]>;
	};
	topBarActions$: Observable<PortalAction[]>;
	toggleTopBarAllActions: () => void;
	toggleActionById: (actionId: string) => void;
	setActiveActionById(actionId: string): void;
}
