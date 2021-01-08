import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LuinDevice } from "../../../api/device.api";
import { Device } from "../../../models/Device";
import { LuinDeviceLogsTable } from "./components/device-logs-table.component";
import { LuinDataStreamingViewModal } from "../modals/data-streaming-view.modal";
import { LuinSaveDeviceModal } from "../modals/save-device.modal";
import styles from "./device-item.module.scss";
import { LuinToken } from "../../../api/token.api";

export function LuinDeviceItem(props: any) {
  const history = useHistory();
  const [isSaveDeviceModalOpen, setIsSaveDeviceModalOpen] = useState<boolean>(
    false
  );
  const [isDataStreamingModalOpen, setIsDataStreamingModalOpen] = useState<
    boolean
  >(false);
  const [device, setDevice] = useState<Device>();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    new LuinDevice()
      .getDeviceByid(props.match.params.deviceId)
      .then((result) => {
        setDevice(result.data[0]);
      });
  }, [props]);

  useEffect(() => {
    const token = new LuinToken().getAccessToken();
    new LuinToken().getTokenData(token).then((result) => {
      setUsername(result.data.data.context.username);
    });
  }, [username]);

  const openEditDevice = () => {
    setIsSaveDeviceModalOpen(true);
  };

  const openDataStreaming = () => {
    setIsDataStreamingModalOpen(true);
  };

  const goToIntegrations = () => {
    history.push(`${props.match.params.deviceId}/integrations`);
  };

  return (
    <>
      <div className={styles.breadCrumbsContainer}>
        <div>Devices &gt; {device?.name}</div>

        <div>
          <span className={styles.breadCrumbLink} onClick={goToIntegrations}>
            Integrations
          </span>
          <span className={styles.breadCrumbLink} onClick={openDataStreaming}>
            Data Streaming View
          </span>
          {device && device.deviceId && username && (
            <LuinDataStreamingViewModal
              device={device}
              username={username}
              setIsDataStreamingViewModalOpen={setIsDataStreamingModalOpen}
              visible={isDataStreamingModalOpen}
            ></LuinDataStreamingViewModal>
          )}
          <span className={styles.breadCrumbLink} onClick={openEditDevice}>
            Edit Device Details
          </span>
          <LuinSaveDeviceModal
            device={device}
            setDevice={setDevice}
            visible={isSaveDeviceModalOpen}
            setIsSaveDeviceModalOpen={setIsSaveDeviceModalOpen}
          ></LuinSaveDeviceModal>
        </div>
      </div>

      <Card>
        <LuinDeviceLogsTable
          deviceId={props.match.params.deviceId}
        ></LuinDeviceLogsTable>
      </Card>
    </>
  );
}
