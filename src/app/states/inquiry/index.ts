import { ThunkAction } from "redux-thunk";
import { typedAction } from "../helpers";
import { InquiriesResponse } from "../../models/Inquiry";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { LuinInquiry } from "../../api/inquiry.api";

interface InquiryState {
  inquiries: InquiriesResponse;
  inquirySearch: string;
  isLoadingInquries: boolean;
}

enum InquiryActions {
  SetInquiries = "inquiry/SET_INQUIRIES",
  SetInquiriesSearch = "inquiry/SET_INQUIRIES_SEARCH",
  SetIsLoadingInquiries = "inquiry/SET_IS_LOADING_INQUIRIES",
}

const initialState: InquiryState = {
  inquiries: {
    Count: { Count: 0 },
    data: [],
    lastEvaluatedKey: "",
  },
  inquirySearch: "",
  isLoadingInquries: false,
};

export const setInquiries = (inquiries: InquiriesResponse) => {
  return typedAction(InquiryActions.SetInquiries, inquiries);
};

export const setInquiriesSearch = (searchKey: string) => {
  return typedAction(InquiryActions.SetInquiriesSearch, searchKey);
};

export const setIsLoadingInquiries = (isLoadingInquiries: boolean) => {
  return typedAction(InquiryActions.SetIsLoadingInquiries, isLoadingInquiries);
};

export const loadInquiries = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoadingInquiries(true));
  try {
    dispatch(setInquiries(await new LuinInquiry().getInquiries()));
    dispatch(setIsLoadingInquiries(false));
  } catch (e) {
    console.log("error", e);
  }
};

type InquiryAction = ReturnType<
  typeof setInquiries | typeof setIsLoadingInquiries | typeof setInquiriesSearch
>;

export function inquiriesReducer(
  state = initialState,
  action: InquiryAction
): InquiryState {
  switch (action.type) {
    case InquiryActions.SetInquiries:
      return {
        ...state,
        inquiries: action.payload,
      };
    case InquiryActions.SetInquiriesSearch:
      return {
        ...state,
        inquirySearch: action.payload,
      };
    case InquiryActions.SetIsLoadingInquiries:
      return {
        ...state,
        isLoadingInquries: action.payload,
      };
    default:
      return state;
  }
}
