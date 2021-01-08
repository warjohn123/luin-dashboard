import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { LuinApplication } from "../../../api/application.api";
import { Device } from "../../../models/Device";
import { LuinDeviceTableAction } from "./device-table-action.component";

export const config = [
  {
    title: "Device Name",
    dataIndex: "name",
    key: "name",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    ellipsis: true,
    render: (text: any, device: Device) => {
      // <LuinDeviceTableAction device={device}></LuinDeviceTableAction>
      const getApplicationId = (): string => {
        return new LuinApplication().getCurrentAppIdFromPath();
      };
      let appId = getApplicationId();

      return (
        <Link to={`/${appId}/devices/device-item/${device.deviceId}`}>
          {device.name}
        </Link>
      );
    },
  },
  {
    title: "Device ID",
    dataIndex: "deviceId",
    key: "deviceId",
    sorter: (a: any, b: any) => a.deviceId.length - b.deviceId.length,
    ellipsis: true,
  },
  {
    title: "Owner ID",
    dataIndex: "ownerId",
    key: "ownerId",
    sorter: (a: any, b: any) => a.ownerId.length - b.ownerId.length,
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    sorter: {
      compare: (a: any, b: any) => a.description.length - b.description.length,
      multiple: 3,
    },
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
    render: (text: any, device: Device) => (
      <LuinDeviceTableAction device={device}></LuinDeviceTableAction>
    ),
  },
];
