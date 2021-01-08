export interface User {
  accountId: string;
  apiKey: string;
  auth: string;
  custom: any;
  dateCreated: number;
  dateUpdated: number;
  groupId: string;
  isActive: boolean;
  password: string;
  type: string;
  username: string;
  validationStatus: string;
}

export interface UserCount {
  Count: number;
}

export interface UsersResponse {
  lastEvaluatedKey: string;
  Count: UserCount;
  data: User[];
}
