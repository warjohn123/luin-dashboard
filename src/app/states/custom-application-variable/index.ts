import { ThunkAction } from "redux-thunk";
import { typedAction } from "../helpers";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { CustomApplicationVariable } from "../../models/CustomApplicationVariable";

interface CustomApplicationVariablesState {
  customApplicationVariables: CustomApplicationVariable[];
  customApplicationVariablesSearch: string;
  isLoadingCustomApplicationVariables: boolean;
}

enum CustomApplicationVariablesActions {
  SetCustomApplicationVariables = "custom-application-variables/SET_CUSTOM_APPLICATION_VARIABLES",
  SetCustomApplicationVariablesSearch = "custom-application-variables/SET_CUSTOM_APPLICATION_VARIABLES_SEARCH",
  SetIsLoadingCustomApplicationVariables = "custom-application-variables/SET_IS_LOADING_SET_CUSTOM_APPLICATION_VARIABLES",
}

const initialState: CustomApplicationVariablesState = {
  customApplicationVariables: [],
  customApplicationVariablesSearch: "",
  isLoadingCustomApplicationVariables: false,
};

export const setCustomApplicationVariables = (
  variables: CustomApplicationVariable[]
) => {
  return typedAction(
    CustomApplicationVariablesActions.SetCustomApplicationVariables,
    variables
  );
};

export const setCustomApplicationVariablesSearch = (searchKey: string) => {
  return typedAction(
    CustomApplicationVariablesActions.SetCustomApplicationVariablesSearch,
    searchKey
  );
};

export const setIsLoadingCustomApplicationVariables = (isLoading: boolean) => {
  return typedAction(
    CustomApplicationVariablesActions.SetIsLoadingCustomApplicationVariables,
    isLoading
  );
};

export const loadVariables = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingCustomApplicationVariables(true));

  setTimeout(() => {
    try {
      dispatch(setCustomApplicationVariables([]));
      dispatch(setIsLoadingCustomApplicationVariables(false));
    } catch (e) {
      console.log("error", e);
    }
  }, 2000);
};

type CustomApplicationVariableAction = ReturnType<
  | typeof setCustomApplicationVariables
  | typeof setIsLoadingCustomApplicationVariables
  | typeof setCustomApplicationVariablesSearch
>;

export function customApplicationVariableReducer(
  state = initialState,
  action: CustomApplicationVariableAction
): CustomApplicationVariablesState {
  switch (action.type) {
    case CustomApplicationVariablesActions.SetCustomApplicationVariables:
      return {
        ...state,
        customApplicationVariables: action.payload,
      };

    case CustomApplicationVariablesActions.SetIsLoadingCustomApplicationVariables:
      return {
        ...state,
        isLoadingCustomApplicationVariables: action.payload,
      };

    case CustomApplicationVariablesActions.SetCustomApplicationVariablesSearch:
      return {
        ...state,
        customApplicationVariablesSearch: action.payload,
      };

    default:
      return state;
  }
}
