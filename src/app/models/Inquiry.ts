export interface Inquiry {
  apiKey: string;
  contactId: string;
  contactNumber: string;
  custom: any;
  dateCreated: number;
  dateUpdated: number;
  email: string;
  filterTag: string;
  message: string;
  name: string;
  ownerId: string;
  receiveUpdate: boolean;
}

export interface InquiryCount {
  Count: number;
}

export interface InquiriesResponse {
  lastEvaluatedKey: string;
  Count: InquiryCount;
  data: Inquiry[];
}
