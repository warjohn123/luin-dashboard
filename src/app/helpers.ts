import { format as formatDate } from "date-fns";

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function defaultDateTimeFormat(time: any) {
  return formatDate(time, "MMMM d, yyyy H:mm a");
}

export function getVariableType(value: any) {
  let type = "";

  if (typeof value === "number") type = "Number";
  if (typeof value === "string") type = "String";
  if (typeof value === "boolean") type = "Boolean";
  if (value && typeof value === "object" && value.constructor === Array)
    type = "List";
  if (value && typeof value === "object" && value.constructor === Object)
    type = "Map";

  return type;
}
