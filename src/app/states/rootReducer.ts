import { combineReducers } from "@reduxjs/toolkit";
import { appBarReducer } from "./app-bar";
import { applicationReducer } from "./application";
import { authReducer } from "./auth";
import { customApplicationVariableReducer } from "./custom-application-variable";
import { devicesReducer } from "./devices";
import { inquiriesReducer } from "./inquiry";
import { subscribersReducer } from "./subscribers";
import { usersReducer } from "./user";
import { schedulesReducer } from "./schedule";
import { integrationsReducer } from "./integrations";
import { storagesReducer } from "./storage";

const rootReducer = combineReducers({
  appBar: appBarReducer,
  application: applicationReducer,
  device: devicesReducer,
  integration: integrationsReducer,
  storage: storagesReducer,
  customApplicationVariable: customApplicationVariableReducer,
  user: usersReducer,
  inquiry: inquiriesReducer,
  subscriber: subscribersReducer,
  schedule: schedulesReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
