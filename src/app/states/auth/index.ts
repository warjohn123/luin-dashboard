import { Dispatch } from "react";
import { AnyAction } from "redux";
import { typedAction } from "../helpers";
import { RootState } from "../rootReducer";

interface AuthState {
  authToken: string;
}

enum AuthActions {
  SetAuthToken = "auth/SET_AUTH_TOKEN",
}

const initialState: AuthState = {
  authToken: "",
};

export const setAuthToken = (authToken: string) => {
  return typedAction(AuthActions.SetAuthToken, authToken);
};

export const loadAuthToken = () => {
  return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    setTimeout(() => {
      const token = getState().auth.authToken;
      if (token) {
        dispatch(setAuthToken(token));
      }
    }, 500);
  };
};

type ApplicationAction = ReturnType<typeof setAuthToken>;

export function authReducer(
  state = initialState,
  action: ApplicationAction
): AuthState {
  switch (action.type) {
    case AuthActions.SetAuthToken:
      return {
        ...state,
        authToken: action.payload,
      };
    default:
      return state;
  }
}
