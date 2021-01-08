import { ThunkAction } from "redux-thunk";
import { typedAction } from "../helpers";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { ScheduleCount, SchedulesResponse } from "../../models/Schedule";
import { LuinSchedule } from "../../api/schedule.api";

interface ScheduleState {
  schedules: SchedulesResponse;
  schedulesCount: ScheduleCount;
  schedulesSearch: string;
  isLoadingSchedules: boolean;
  isLoadingSchedulesCount: boolean;
}

enum ScheduleActions {
  SetSchedules = "schedule/SET_SCHEDULES",
  SetSchedulesSearch = "schedule/SET_SCHEDULES_SEARCH",
  SetSchedulesCount = "schedule/SET_SCHEDULES_COUNT",
  SetIsLoadingSchedules = "schedule/SET_IS_LOADING_SCHEDULES",
  SetIsLoadingSchedulesCount = "schedule/SET_IS_LOADING_SCHEDULES_COUNT",
}

const initialState: ScheduleState = {
  schedules: {
    lastEvaluatedKey: "",
    data: [],
    Count: { count: 0 },
  },
  schedulesCount: {
    count: 0,
  },
  schedulesSearch: "",
  isLoadingSchedules: false,
  isLoadingSchedulesCount: false,
};

export const setSchedules = (schedules: SchedulesResponse) => {
  return typedAction(ScheduleActions.SetSchedules, schedules);
};

export const setSchedulesCount = (schedulesCount: ScheduleCount) => {
  return typedAction(ScheduleActions.SetSchedulesCount, schedulesCount);
};

export const setSchedulesSearch = (searchKey: string) => {
  return typedAction(ScheduleActions.SetSchedulesSearch, searchKey);
};

export const setIsLoadingSchedules = (isLoadingUsers: boolean) => {
  return typedAction(ScheduleActions.SetIsLoadingSchedules, isLoadingUsers);
};

export const setIsLoadingScheduleCount = (isLoadingScheduleCount: boolean) => {
  return typedAction(
    ScheduleActions.SetIsLoadingSchedulesCount,
    isLoadingScheduleCount
  );
};

export const loadSchedulesCount = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingScheduleCount(true));
  try {
    dispatch(setSchedulesCount(await new LuinSchedule().countSchedules()));
    dispatch(setIsLoadingScheduleCount(false));
  } catch (e) {
    console.log("error", e);
  }
};

export const loadSchedules = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingSchedules(true));
  try {
    dispatch(setSchedules(await new LuinSchedule().listSchedules()));
    dispatch(setIsLoadingSchedules(false));
  } catch (e) {
    console.log("error", e);
  }
};

type ScheduleAction = ReturnType<
  | typeof setSchedules
  | typeof setSchedulesCount
  | typeof setIsLoadingScheduleCount
  | typeof setIsLoadingSchedules
  | typeof setSchedulesSearch
>;

export function schedulesReducer(
  state = initialState,
  action: ScheduleAction
): ScheduleState {
  switch (action.type) {
    case ScheduleActions.SetSchedules:
      return {
        ...state,
        schedules: action.payload,
      };
    case ScheduleActions.SetSchedulesCount:
      return {
        ...state,
        schedulesCount: action.payload,
      };
    case ScheduleActions.SetSchedulesSearch:
      return {
        ...state,
        schedulesSearch: action.payload,
      };
    case ScheduleActions.SetIsLoadingSchedules:
      return {
        ...state,
        isLoadingSchedules: action.payload,
      };
    case ScheduleActions.SetIsLoadingSchedulesCount:
      return {
        ...state,
        isLoadingSchedulesCount: action.payload,
      };
    default:
      return state;
  }
}
