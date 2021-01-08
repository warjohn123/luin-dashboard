export interface Schedule {
  taskId?: string;
  ownerId?: string;
  expressionValue: any;
  type?: ScheduleType;
  status?: ScheduleStatus;
  method: string;
  syntax: SyntaxType;
  resource: Resource;
  payload: any;
  dateCreated?: number;
  dateUpdated?: number;
}

export interface Resource {
  name: string;
  custom: any;
}

export enum SyntaxType {
  cron = "cron",
  scheduleDate = "scheduleDate",
  timeout = "timeout",
}

export enum ScheduleStatus {
  pending = "pending",
  success = "completed.success",
  cancelled = "completed.cancelled",
}

export enum ScheduleType {
  once = "once",
  recurring = "recurring",
}

export enum ScheduleMethod {
  lambdaInvoke = "lambdaInvoke",
  httpGET = "httpGET",
  httpPOST = "httpPOST",
  httpPUT = "httpPUT",
  httpDELETE = "httpDELETE",
  websocketEmit = "websocketEmit",
  mqttPublish = "mqttPublish",
}

export interface ScheduleCount {
  count: number;
}

export interface SchedulesResponse {
  lastEvaluatedKey: string;
  Count: ScheduleCount;
  data: Schedule[];
}
