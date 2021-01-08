import { Button, Card, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Device, DeviceCount, DevicesResponse } from "../../../models/Device";
import {
  loadDevices,
  loadDevicesCount,
  setDevicesSearch,
} from "../../../states/devices";
import { RootState } from "../../../states/rootReducer";
import { config } from "./device-table.config";
import styles from "../devices.module.scss";
import { LuinSaveDeviceModal } from "../modals/save-device.modal";
import { ReactComponent as Filter } from "../../../../assets/icons/filters.svg";
import { ReactComponent as Search } from "../../../../assets/icons/search.svg";

export function LuinDeviceListTable() {
  const dispatch = useDispatch();

  const devices: DevicesResponse = useSelector(
    (state: RootState) => state.device.devices || []
  );

  const isLoadingDevices = useSelector(
    (state: RootState) => state.device.isLoadingDevices || false
  );

  const searchKey: string = useSelector(
    (state: RootState) => state.device.devicesSearch || ""
  );
  let allDevices: Device[] = devices.data;
  let displayedDevices: Device[] = devices.data;

  const [isSaveDeviceModalOpen, setIsSaveDeviceModalOpen] = useState<boolean>(
    false
  );

  const devicesCount: DeviceCount = useSelector(
    (state: RootState) => state.device.devicesCount || 0
  );

  const isLoadingDevicesCount: boolean = useSelector(
    (state: RootState) => state.device.isLoadingDevicesCount || false
  );

  const handleSearchChange = (e: any) => {
    dispatch(setDevicesSearch(e.target.value));
  };

  useEffect(() => {
    dispatch(loadDevicesCount());
  }, [dispatch]);

  const addDevice = () => {
    setIsSaveDeviceModalOpen(true);
  };

  if (searchKey) {
    displayedDevices = allDevices.filter((device) =>
      device.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  } else {
    displayedDevices = allDevices;
  }

  useEffect(() => {
    dispatch(loadDevices());
  }, [dispatch]);

  return (
    <Card>
      <div className={styles.filtersContainer}>
        <div>
          <Input
            className={styles.input}
            value={searchKey}
            onChange={handleSearchChange}
            prefix={<Search style={{ marginRight: "10px" }}></Search>}
            placeholder="Search device name"
          ></Input>
          <Filter className={styles.svg}></Filter>
        </div>
        {!isLoadingDevicesCount && (
          <div>
            <div className={styles.totalText}>
              {devicesCount.Count} total devices registered
            </div>
            <Button
              type="primary"
              onClick={addDevice}
              className={styles.addBtn}
            >
              Add Device
            </Button>
            <LuinSaveDeviceModal
              setIsSaveDeviceModalOpen={setIsSaveDeviceModalOpen}
              visible={isSaveDeviceModalOpen}
            ></LuinSaveDeviceModal>
          </div>
        )}
      </div>
      <Table
        loading={isLoadingDevices}
        dataSource={displayedDevices}
        columns={config}
      />
    </Card>
  );
}
