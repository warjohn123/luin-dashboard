import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { notification } from "antd";

enum NotificationType {
  success = "success",
  error = "error",
}

export const openSuccessNotification = (
  description?: string
): ThunkAction<void, RootState, null, Action<string>> => async () => {
  notification[NotificationType.success]({
    message: "Success",
    description: description || "Successfully saved",
  });
};

export const openErrorNotification = (
  description?: string
): ThunkAction<void, RootState, null, Action<string>> => async () => {
  notification[NotificationType.error]({
    message: "Error",
    description: description || "Something went wrong. Please try again",
  });
};
