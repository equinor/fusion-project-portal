import React, { FunctionComponent } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PortalAction {
  actionId: string;
  name: string;
  icon: string | { component: React.FC, name: string }
  onClick?: (actionId: string) => void;
  tooltip?: React.ReactNode;
  component?: FunctionComponent;
  widgetId?: string;
  appendDivider?: boolean;
  dropDownOnly?: boolean;
  topParOnly?: boolean;
}

export interface PortalActions {
  actions$: BehaviorSubject<PortalAction[]>;
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
