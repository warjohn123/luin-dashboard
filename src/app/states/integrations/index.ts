import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { LuinDevice } from "../../api/device.api";
import { DeviceIntegrationsResponse } from "../../models/Device";
import { typedAction } from "../helpers";
import { RootState } from "../rootReducer";

interface DeviceIntegrationState {
  integrations: DeviceIntegrationsResponse;
  isLoadingDeviceIntegrations: boolean;
}

enum DeviceIntegrationActions {
  SetIntegrations = "integration/SET_INTEGRATIONS",
  SetIsLoadingDeviceIntegrations = "integration/SET_IS_LOADING_DEVICE_INTEGRATIONS",
}

const initialState: DeviceIntegrationState = {
  integrations: {
    data: [],
    lastEvaluatedKey: "",
  },
  isLoadingDeviceIntegrations: false,
};

export const setIntegrations = (devices: DeviceIntegrationsResponse) => {
  return typedAction(DeviceIntegrationActions.SetIntegrations, devices);
};

export const setIsLoadingDeviceIntegrations = (isLoading: boolean) => {
  return typedAction(
    DeviceIntegrationActions.SetIsLoadingDeviceIntegrations,
    isLoading
  );
};

export const loadIntegrations = (
  deviceId: string
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
  dispatch(setIsLoadingDeviceIntegrations(true));
  try {
    dispatch(
      setIntegrations(
        await await new LuinDevice().listDeviceIntegrations(deviceId)
      )
    );
    dispatch(setIsLoadingDeviceIntegrations(false));
  } catch (e) {
    console.log("error", e);
  }
};

type DeviceIntegrationAction = ReturnType<
  typeof setIntegrations | typeof setIsLoadingDeviceIntegrations
>;

export function integrationsReducer(
  state = initialState,
  action: DeviceIntegrationAction
): DeviceIntegrationState {
  switch (action.type) {
    case DeviceIntegrationActions.SetIntegrations:
      return {
        ...state,
        integrations: action.payload,
      };
    case DeviceIntegrationActions.SetIsLoadingDeviceIntegrations:
      return {
        ...state,
        isLoadingDeviceIntegrations: action.payload,
      };

    default:
      return state;
  }
}
