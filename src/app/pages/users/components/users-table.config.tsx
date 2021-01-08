import { Space, Tag } from "antd";
import moment from "moment";
import React from "react";
import { toTitleCase } from "../../../helpers";
import { User } from "../../../models/User";

import { LuinDeleteUserModal } from "../modals/delete-user.modal";
import { LuinUserTableAction } from "./user-table-action.component";

export const config = [
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
    sorter: (a: any, b: any) => a.username.length - b.username.length,
    ellipsis: true,
  },
  {
    title: "Account ID",
    dataIndex: "accountId",
    key: "accountId",
    sorter: (a: any, b: any) => a.accountId.length - b.accountId.length,
    ellipsis: true,
  },
  {
    title: "Group ID",
    dataIndex: "groupId",
    key: "groupId",
    sorter: (a: any, b: any) => a.groupId.length - b.groupId.length,
    ellipsis: true,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sorter: (a: any, b: any) => a - b,
    ellipsis: true,
    // render: (type: string) => (
    //   <>
    //     <Tag>{toTitleCase(type)}</Tag>
    //   </>
    // ),
  },
  {
    title: "Status",
    dataIndex: "validationStatus",
    key: "validationStatus",
    sorter: (a: any, b: any) => a - b,
    ellipsis: true,
    // render: (status: string) => (
    //   <>
    //     <Tag>{toTitleCase(status)}</Tag>
    //   </>
    // ),
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
    key: "dateCreated",
    sorter: (a: any, b: any) => a.dateCreated - b.dateCreated,
    ellipsis: true,
    render: (date: number) => <>{moment(date).format("MMMM DD, yyyy")}</>,
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
    render: (text: any, user: User) => (
      <LuinUserTableAction user={user}></LuinUserTableAction>
    ),
  },
];
