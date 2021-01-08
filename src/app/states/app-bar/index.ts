import { typedAction } from "../helpers";

interface AppBarState {
  isAppBarOpen: boolean;
}

enum AppBarActions {
  SetIsAppBarOpen = "appbar/SET_IS_APP_BAR_OPEN",
}

const initialState: AppBarState = {
  isAppBarOpen: false,
};

export const setIsAppBarOpen = (isOpen: boolean) => {
  return typedAction(AppBarActions.SetIsAppBarOpen, isOpen);
};

type AppBarAction = ReturnType<typeof setIsAppBarOpen>;

export function appBarReducer(
  state = initialState,
  action: AppBarAction
): AppBarState {
  switch (action.type) {
    case AppBarActions.SetIsAppBarOpen:
      return {
        ...state,
        isAppBarOpen: action.payload,
      };

    default:
      return state;
  }
}
