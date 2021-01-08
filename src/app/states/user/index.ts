import { ThunkAction } from "redux-thunk";
import { typedAction } from "../helpers";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { UserCount, UsersResponse } from "../../models/User";
import { LuinAccount } from "../../api/account.api";

interface UserState {
  users: UsersResponse;
  usersCount: UserCount;
  usersSearch: string;
  isLoadingUsers: boolean;
  isLoadingUsersCount: boolean;
}

enum UserActions {
  SetUsers = "user/SET_USERS",
  SetUsersCount = "user/SET_USERS_COUNT",
  SetUsersSearch = "user/SET_USERS_SEARCH",
  SetIsLoadingUsers = "user/SET_IS_LOADING_USERS",
  SetIsLoadingUsersCount = "user/SET_IS_LOADING_USERS_COUNT",
}

const initialState: UserState = {
  users: {
    lastEvaluatedKey: "",
    data: [],
    Count: { Count: 0 },
  },
  usersCount: { Count: 0 },
  usersSearch: "",
  isLoadingUsers: false,
  isLoadingUsersCount: false,
};

export const setUsers = (users: UsersResponse) => {
  return typedAction(UserActions.SetUsers, users);
};

export const setUsersCount = (usersCount: UserCount) => {
  return typedAction(UserActions.SetUsersCount, usersCount);
};

export const setUsersSearch = (serachKey: string) => {
  return typedAction(UserActions.SetUsersSearch, serachKey);
};

export const setIsLoadingUsers = (isLoadingUsers: boolean) => {
  return typedAction(UserActions.SetIsLoadingUsers, isLoadingUsers);
};

export const setIsLoadingUsersCount = (isLoadingUsersCount: boolean) => {
  return typedAction(UserActions.SetIsLoadingUsersCount, isLoadingUsersCount);
};

export const loadUsersCount = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingUsersCount(true));
  try {
    dispatch(setUsersCount(await new LuinAccount().countAccounts()));
    dispatch(setIsLoadingUsersCount(false));
  } catch (e) {
    console.log("error", e);
  }
};

export const loadUsers = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingUsers(true));
  try {
    dispatch(setUsers(await new LuinAccount().getAccounts()));
    dispatch(setIsLoadingUsers(false));
  } catch (e) {
    console.log("error", e);
  }
};

type UserAction = ReturnType<
  | typeof setUsers
  | typeof setUsersCount
  | typeof setIsLoadingUsersCount
  | typeof setIsLoadingUsers
  | typeof setUsersSearch
>;

export function usersReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case UserActions.SetUsers:
      return {
        ...state,
        users: action.payload,
      };
    case UserActions.SetUsersCount:
      return {
        ...state,
        usersCount: action.payload,
      };
    case UserActions.SetUsersSearch:
      return {
        ...state,
        usersSearch: action.payload,
      };
    case UserActions.SetIsLoadingUsers:
      return {
        ...state,
        isLoadingUsers: action.payload,
      };
    case UserActions.SetIsLoadingUsersCount:
      return {
        ...state,
        isLoadingUsersCount: action.payload,
      };
    default:
      return state;
  }
}
