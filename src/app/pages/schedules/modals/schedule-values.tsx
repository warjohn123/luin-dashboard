import {
  ScheduleMethod,
  ScheduleStatus,
  SyntaxType,
} from "../../../models/Schedule";

export const syntaxes = [
  { value: SyntaxType.cron, label: "Cron" },
  { value: SyntaxType.scheduleDate, label: "Schedule Date" },
  { value: SyntaxType.timeout, label: "Timeout" },
];
export const methods = [
  { value: ScheduleMethod.lambdaInvoke, label: "Lambda Invoke" },
  { value: ScheduleMethod.httpGET, label: "HTTP GET" },
  { value: ScheduleMethod.httpPOST, label: "HTTP POST" },
  { value: ScheduleMethod.httpPUT, label: "HTTP PUT" },
  { value: ScheduleMethod.httpDELETE, label: "HTTP DELETE" },
  { value: ScheduleMethod.websocketEmit, label: "Websocket Emit" },
  { value: ScheduleMethod.mqttPublish, label: "MQTT Publish" },
];
export const statuses = [
  {
    value: ScheduleStatus.pending,
    label: "Pending",
  },
  {
    value: ScheduleStatus.success,
    label: "Success",
  },
  {
    value: ScheduleStatus.cancelled,
    label: "Cancelled",
  },
];
