import { ThunkAction } from "redux-thunk";
import { typedAction } from "../helpers";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { Application, ApplicationsResponse } from "../../models/Application";
import { LuinApplication } from "../../api/application.api";

interface ApplicationState {
  applications: ApplicationsResponse;
  isLoadingApplications: boolean;
  isLoadingCurrentApplication: boolean;
  currentApplication: Application;
}

enum ApplicationActions {
  SetApplications = "application/SET_APPLICATIONS",
  SetIsLoadingApplications = "application/SET_IS_LOADING_APPLICATIONS",
  SetIsLoadingCurrentApplication = "application/SET_IS_LOADING_CURRENT_APPLICATION",
  SetCurrentApplication = "application/SET_CURRENT_APPLICATION",
}

const initialState: ApplicationState = {
  isLoadingApplications: false,
  isLoadingCurrentApplication: false,
  applications: {
    Count: { Count: 0 },
    lastEvaluatedKey: "",
    data: [],
  },
  currentApplication: {
    applicationId: "",
    name: "",
    custom: {},
    dateCreated: 0,
    dateUpdated: 0,
    description: "",
    forgotPasswordEmailSender: "",
    forgotPasswordHTMLTemplate: "",
    forgotPasswordNameSender: "",
    ownerId: "",
  },
};

export const setApplications = (applications: ApplicationsResponse) => {
  return typedAction(ApplicationActions.SetApplications, applications);
};

export const setCurrentApplication = (currentApplication: Application) => {
  return typedAction(
    ApplicationActions.SetCurrentApplication,
    currentApplication
  );
};

export const setIsLoadingApplications = (isLoadingApplications: boolean) => {
  return typedAction(
    ApplicationActions.SetIsLoadingApplications,
    isLoadingApplications
  );
};

export const setIsLoadingCurrentApplication = (
  isLoadingApplication: boolean
) => {
  return typedAction(
    ApplicationActions.SetIsLoadingCurrentApplication,
    isLoadingApplication
  );
};

export const loadCurrentApplication = (
  currentApplication: Application
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
  dispatch(setIsLoadingCurrentApplication(true));

  setTimeout(() => {
    try {
      dispatch(setCurrentApplication(currentApplication));
      dispatch(setIsLoadingCurrentApplication(false));
    } catch (e) {
      console.log("error", e);
    }
  });
};

export const loadCurrentApplicationById = (
  applicationId: string
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
  new LuinApplication().getApplication(applicationId).then((result) => {
    const app = result.data[0];
    dispatch(setCurrentApplication(app));
  });
};

export const loadApplications = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingApplications(true));

  try {
    // dispatch(setApplications([]));
    dispatch(setApplications(await new LuinApplication().listApplication()));
    dispatch(setIsLoadingApplications(false));
  } catch (e) {
    console.log("error", e);
  }
};

type ApplicationAction = ReturnType<
  | typeof setApplications
  | typeof setIsLoadingApplications
  | typeof setCurrentApplication
  | typeof setIsLoadingCurrentApplication
>;

export function applicationReducer(
  state = initialState,
  action: ApplicationAction
): ApplicationState {
  switch (action.type) {
    case ApplicationActions.SetApplications:
      return {
        ...state,
        applications: action.payload,
      };

    case ApplicationActions.SetIsLoadingApplications:
      return {
        ...state,
        isLoadingApplications: action.payload,
      };
    case ApplicationActions.SetCurrentApplication:
      return {
        ...state,
        currentApplication: action.payload,
      };
    case ApplicationActions.SetIsLoadingCurrentApplication:
      return {
        ...state,
        isLoadingCurrentApplication: action.payload,
      };
    default:
      return state;
  }
}
