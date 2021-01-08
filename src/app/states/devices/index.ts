import { ThunkAction } from "redux-thunk";
import { typedAction } from "../helpers";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { DeviceCount, DevicesResponse } from "../../models/Device";
import { LuinDevice } from "../../api/device.api";

interface DeviceState {
  devices: DevicesResponse;
  devicesCount: DeviceCount;
  devicesSearch: string;
  isLoadingDevices: boolean;
  isLoadingDevicesCount: boolean;
}

enum DeviceActions {
  SetDevices = "device/SET_DEVICES",
  SetDevicesCount = "device/SET_DEVICES_COUNT",
  SetDevicesSearch = "device/SET_DEVICES_SEARCH",
  SetIsLoadingDevices = "device/SET_IS_LOADING_DEVICES",
  SetIsLoadingDevicesCount = "device/SET_IS_LOADING_DEVICES_COUNT",
}

const initialState: DeviceState = {
  devices: {
    Count: { Count: 0 },
    data: [],
    lastEvaluatedKey: "",
  },
  devicesCount: { Count: 0 },
  devicesSearch: "",
  isLoadingDevicesCount: false,
  isLoadingDevices: false,
};

export const setDevices = (devices: DevicesResponse) => {
  return typedAction(DeviceActions.SetDevices, devices);
};

export const setDevicesCount = (count: DeviceCount) => {
  return typedAction(DeviceActions.SetDevicesCount, count);
};

export const setDevicesSearch = (searchKey: string) => {
  return typedAction(DeviceActions.SetDevicesSearch, searchKey);
};

export const setIsLoadingDevices = (isLoadingDevices: boolean) => {
  return typedAction(DeviceActions.SetIsLoadingDevices, isLoadingDevices);
};

export const setIsLoadingDevicesCount = (isLoadingDevicesCount: boolean) => {
  return typedAction(
    DeviceActions.SetIsLoadingDevicesCount,
    isLoadingDevicesCount
  );
};

export const loadDevicesCount = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingDevicesCount(true));
  try {
    dispatch(setDevicesCount(await new LuinDevice().countAdminDevices()));
    dispatch(setIsLoadingDevicesCount(false));
  } catch (e) {
    console.log("error", e);
  }
};

export const loadDevices = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingDevices(true));
  try {
    dispatch(setDevices(await new LuinDevice().getAdminDevices()));
    dispatch(setIsLoadingDevices(false));
  } catch (e) {
    console.log("error", e);
  }
};

type DeviceAction = ReturnType<
  | typeof setDevices
  | typeof setDevicesCount
  | typeof setIsLoadingDevices
  | typeof setIsLoadingDevicesCount
  | typeof setDevicesSearch
>;

export function devicesReducer(
  state = initialState,
  action: DeviceAction
): DeviceState {
  switch (action.type) {
    case DeviceActions.SetDevices:
      return {
        ...state,
        devices: action.payload,
      };

    case DeviceActions.SetDevicesCount:
      return {
        ...state,
        devicesCount: action.payload,
      };

    case DeviceActions.SetDevicesSearch:
      return {
        ...state,
        devicesSearch: action.payload,
      };

    case DeviceActions.SetIsLoadingDevices:
      return {
        ...state,
        isLoadingDevices: action.payload,
      };

    case DeviceActions.SetIsLoadingDevicesCount:
      return {
        ...state,
        isLoadingDevicesCount: action.payload,
      };
    default:
      return state;
  }
}
