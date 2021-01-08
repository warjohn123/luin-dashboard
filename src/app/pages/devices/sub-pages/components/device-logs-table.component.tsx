import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuinToken } from "../../../../api/token.api";
import { DeviceStorageResponse } from "../../../../models/Device";
import { RootState } from "../../../../states/rootReducer";
import { loadStorages } from "../../../../states/storage";
import { config } from "./device-logs-table.config";

interface LuinDeviceLogsTableType {
  deviceId: string;
}

export const LuinDeviceLogsTable: React.FunctionComponent<LuinDeviceLogsTableType> = ({
  deviceId,
}) => {
  const dispatch = useDispatch();

  const storages: DeviceStorageResponse = useSelector(
    (state: RootState) => state.storage.storages || []
  );

  const isLoadingDeviceStorages = useSelector(
    (state: RootState) => state.storage.isLoadingDeviceStorages || false
  );

  useEffect(() => {
    const token = new LuinToken().getAccessToken();

    new LuinToken().getTokenData(token).then((result) => {
      const username = result.data.data.context.username;
      try {
        dispatch(loadStorages(deviceId, username));
      } catch {
        throw new Error("Authorization error.");
      }
    });
  }, [deviceId, dispatch]);

  return (
    <Table
      loading={isLoadingDeviceStorages}
      dataSource={storages.data}
      columns={config}
    />
  );
};
