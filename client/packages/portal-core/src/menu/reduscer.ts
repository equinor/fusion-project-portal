import { ReactiveObservable } from '@equinor/fusion-observable';
import { AppGroup } from '@equinor/portal-core';
import { filter, tap } from 'rxjs';

interface MenuState {
  appGroups: AppGroup[];
  isLoading: boolean;
  error?: string;
}

enum ActionType {
  ADD_APP_GROUP = 'add-app-groups',
  ON_ERROR = 'error',
  IS_LOADING = 'loading',
}

type AddAppGroup = {
  type: ActionType.ADD_APP_GROUP;
  payload: AppGroup[];
};

type OnError = {
  type: ActionType.ON_ERROR;
  payload: string;
};
type OnLoad = {
  type: ActionType.IS_LOADING;
};

type Actions = AddAppGroup | OnError | OnLoad;

function reducer(state: MenuState, action: Actions): MenuState {
  switch (action.type) {
    case ActionType.ADD_APP_GROUP: {
      return { ...state, appGroups: action.payload, isLoading: false };
    }
    case ActionType.IS_LOADING: {
      return { ...state, isLoading: true };
    }
    case ActionType.ON_ERROR: {
      return { ...state, error: action.payload, isLoading: false };
    }
    default: {
      return state;
    }
  }
}

const menuState$ = new ReactiveObservable<MenuState, Actions>(reducer, {
  isLoading: false,
  appGroups: [],
});

menuState$.addEpic((a, s) =>
  a.pipe(
    filter((x) => x.type === ActionType.ADD_APP_GROUP ),
    tap((a: AddAppGroup) => a.)
  )
);
