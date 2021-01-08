export interface Application {
  applicationId?: string;
  custom?: any;
  dateCreated?: number;
  dateUpdated?: number;
  description: string;
  forgotPasswordEmailSender?: string;
  forgotPasswordHTMLTemplate?: string;
  forgotPasswordNameSender?: string;
  name: string;
  ownerId?: string;
  isSandbox?: boolean;
}

export interface ApplicationCount {
  Count: number;
}

export interface ApplicationsResponse {
  lastEvaluatedKey: string;
  Count: ApplicationCount;
  data: Application[];
}
