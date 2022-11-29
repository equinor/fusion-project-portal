---
title: Portal Actions 
category: frontend
tags:
    - actions
    - favorites
    - settings
---


## Add New Action

For a developer to add a new is fairly simple go to `portal-actions-config.ts` file and append a new PortalAction.

```TS
export interface PortalAction {
  actionId: string;
  name: string;
  icon: string;
  onClick?: VoidFunction;
  component?: FunctionComponent;
  widgetId?: string;
  appendDivider?: boolean
}
```

The onClick function lets you define a custom action if noe present the default action will be
opening a side sheet with the given component. If no component is provided the side sheet wil be
empty or display configuration needed.

:::info  
The widgetId is not in use for the moment. the thought behind it is to dynamically load a action widget to keep portal bundle as small ass possible.
:::

## Portal Actions

The current portal action that ar configured are shown in the list below.

```TS
    export const actions: PortalAction[] = [
      {
        actionId: 'full-screen',
        name: 'Full screen',
        icon: FullScreenIcon,
        appendDivider: true,
        onClick: handleFullScreenClick,
        topParOnly: true,
      },
      {
        actionId: 'my-account',
        name: 'My Account',
        icon: 'account_circle',
        component: MyAccount,
        dropDownOnly: true,
      },
      {
        actionId: 'bookmarks',
        name: 'Bookmarks',
        icon: 'bookmarks',
        component: Bookmarks,
      },
      {
        actionId: 'task',
        name: 'Task',
        icon: 'view_list',
        component: Task,
      },
      {
        actionId: 'notifications',
        name: 'Notifications',
        icon: 'notifications',
        component: Notifications,
      },
      {
        actionId: 'service-message',
        name: 'Service message',
        icon: 'comment_chat',
      },
      {
        actionId: 'help',
        name: 'Help / Service now',
        icon: 'help_outline',
        component: Help,
      },
    ];

```

## Top Bar Actions

A top bar action can be considered a portal action favorite, by staring the action the action will be displayed in the top bar.

## Actions Views

As default a action view is displaced with a scrim and component sliding in form the left. this can be over written by providing an
onClick function in the configuration of the Portal Action.

## State Handling

State is handle with `RXJS` observables, tis may be overkill but allows us to completely control renders in the application. And the reactive nature of RXJS helps.

It is possible for the use to select what actions to display in the top bar, the actionId's ar stored in Local storage under `menu-favorites`;
