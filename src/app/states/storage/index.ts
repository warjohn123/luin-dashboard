import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { LuinDevice } from "../../api/device.api";
import { DeviceStorageResponse } from "../../models/Device";
import { typedAction } from "../helpers";
import { RootState } from "../rootReducer";

interface DeviceStorageState {
  storages: DeviceStorageResponse;
  isLoadingDeviceStorages: boolean;
}

enum DeviceStoragesActions {
  SetDeviceStorages = "storage/SET_DEVICE_STORAGES",
  SetIsLoadingDeviceStorages = "storage/SET_IS_LOADING_DEVICE_STORAGES",
}

const initialState: DeviceStorageState = {
  storages: {
    data: [],
    lastEvaluatedKey: "",
  },
  isLoadingDeviceStorages: false,
};

export const setDeviceStorages = (storages: DeviceStorageResponse) => {
  return typedAction(DeviceStoragesActions.SetDeviceStorages, storages);
};

export const setIsLoadingDeviceStorages = (isLoading: boolean) => {
  return typedAction(
    DeviceStoragesActions.SetIsLoadingDeviceStorages,
    isLoading
  );
};

export const loadStorages = (
  deviceId: string,
  username: string
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
  dispatch(setIsLoadingDeviceStorages(true));
  try {
    dispatch(
      setDeviceStorages(
        await new LuinDevice().listDeviceStorage(deviceId, username)
      )
    );
    dispatch(setIsLoadingDeviceStorages(false));
  } catch (e) {
    console.log("error", e);
  }
};

type DeviceStoragesAction = ReturnType<
  typeof setDeviceStorages | typeof setIsLoadingDeviceStorages
>;

export function storagesReducer(
  state = initialState,
  action: DeviceStoragesAction
): DeviceStorageState {
  switch (action.type) {
    case DeviceStoragesActions.SetDeviceStorages:
      return {
        ...state,
        storages: action.payload,
      };
    case DeviceStoragesActions.SetIsLoadingDeviceStorages:
      return {
        ...state,
        isLoadingDeviceStorages: action.payload,
      };

    default:
      return state;
  }
}
