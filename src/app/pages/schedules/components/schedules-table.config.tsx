import moment from "moment";
import React from "react";
import { Schedule, ScheduleStatus } from "../../../models/Schedule";
import { LuinScheduleTableAction } from "./schedules-table-action.component";

export const config = [
  {
    title: "Schedule Id",
    dataIndex: "taskId",
    key: "taskId",
    // sorter: (a: any, b: any) => a.username.length - b.username.length,
    ellipsis: true,
  },
  {
    title: "Date",
    dataIndex: "dateCreated",
    key: "dateCreated",
    sorter: (a: any, b: any) => a.dateCreated - b.dateCreated,
    ellipsis: true,
    render: (date: number) => <>{moment(date).format("MMMM DD, yyyy")}</>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a: any, b: any) => a.status.length - b.status.length,
    ellipsis: true,
    render: (text: any) => {
      const parseStatus = (status: string): string => {
        let display = "";
        if (status === ScheduleStatus.pending) {
          display = "Pending";
        } else if (status === ScheduleStatus.cancelled) {
          display = "Cancelled";
        } else if (status === ScheduleStatus.success) {
          display = "Success";
        }
        return display;
      };

      return parseStatus(text);
    },
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    // sorter: (a: any, b: any) => a.username.length - b.username.length,
    ellipsis: true,
  },
  {
    title: "Last Updated",
    dataIndex: "dateUpdated",
    key: "dateUpdated",
    sorter: (a: any, b: any) => a.dateUpdated - b.dateUpdated,
    ellipsis: true,
    render: (date: number) => <>{moment(date).format("MMMM DD, yyyy")}</>,
  },
  {
    title: "",
    key: "action",
    render: (text: any, schedule: Schedule) => (
      <LuinScheduleTableAction schedule={schedule}></LuinScheduleTableAction>
    ),
  },
];
