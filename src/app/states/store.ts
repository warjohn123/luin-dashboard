import { Action, configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";
import { ThunkAction } from "redux-thunk";
const store = configureStore({
  reducer: rootReducer,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
if (process.env.NODE_ENV === "development" && module.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
export default store;
