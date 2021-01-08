import { ThunkAction } from "redux-thunk";
import { typedAction } from "../helpers";
import { SubscribersResponse } from "../../models/Subscriber";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { LuinSubscriber } from "../../api/subscriber.api";

interface SubscriberState {
  subscribers: SubscribersResponse;
  isLoadingSubscribers: boolean;
}

enum SubscriberActions {
  SetSubscribers = "user/SET_SUBSCRIBERS",
  SetIsLoadingSubscribers = "user/SET_IS_LOADING_SUBSCRIBERS",
}

const initialState: SubscriberState = {
  subscribers: {
    Count: { Count: 0 },
    data: [],
    lastEvaluatedKey: "",
  },
  isLoadingSubscribers: false,
};

export const setSubscribers = (subscribers: SubscribersResponse) => {
  return typedAction(SubscriberActions.SetSubscribers, subscribers);
};

export const setIsLoadingSubscribers = (isLoadingSubscribers: boolean) => {
  return typedAction(
    SubscriberActions.SetIsLoadingSubscribers,
    isLoadingSubscribers
  );
};

export const loadSubscribers = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingSubscribers(true));
  try {
    dispatch(setSubscribers(await new LuinSubscriber().getSubscribers()));
    dispatch(setIsLoadingSubscribers(false));
  } catch (e) {
    console.log("error", e);
  }
};

type SubscriberAction = ReturnType<
  typeof setSubscribers | typeof setIsLoadingSubscribers
>;

export function subscribersReducer(
  state = initialState,
  action: SubscriberAction
): SubscriberState {
  switch (action.type) {
    case SubscriberActions.SetSubscribers:
      return {
        ...state,
        subscribers: action.payload,
      };

    case SubscriberActions.SetIsLoadingSubscribers:
      return {
        ...state,
        isLoadingSubscribers: action.payload,
      };
    default:
      return state;
  }
}
