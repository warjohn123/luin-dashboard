import Axios from "axios";
import { InquiriesResponse, InquiryCount } from "../models/Inquiry";

export class LuinInquiry {
  getInquiries(): Promise<InquiriesResponse> {
    return Axios.get("/admin/leads/inquiry").then(
      (response) => response.data as InquiriesResponse
    );
  }

  countInquiries(): Promise<InquiryCount> {
    return Axios.get("admin/leads/inquiry", {
      params: {
        countOnly: true,
      },
    }).then((response) => response.data as InquiryCount);
  }
}
