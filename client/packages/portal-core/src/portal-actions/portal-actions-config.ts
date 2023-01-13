import {
  Bookmarks,
  FullscreenIcon,
  Help,
  MyAccount,
  Notifications,
  Task,
} from '@equinor/portal-ui';
import {
  ServiceMessageIcon,
  ServiceMessages,
} from '@equinor/service-message';
import { PortalAction } from './types';
import { handleFullscreenClick } from './utils';



export const actions: PortalAction[] = [
  {
    actionId: 'full-screen',
    name: 'Full screen',
    icon: { component: FullscreenIcon, name: "fullscreen" },
    appendDivider: true,
    onClick: handleFullscreenClick,
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
    icon: { component: ServiceMessageIcon, name: "comment_chat" },
    component: ServiceMessages,
  },
  {
    actionId: 'help',
    name: 'Help / Service now',
    icon: 'help_outline',
    component: Help,
  },
];
