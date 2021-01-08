import { Button, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { LuinDevice } from "../../../api/device.api";
import { Device, DeviceIntegrationsResponse } from "../../../models/Device";
import styles from "./device-item.module.scss";
import { LuinDeviceIntegrationItem } from "./components/device-integration-item.component";
import { LuinSaveIntegrationModal } from "../modals/save-integration.modal";
import { loadIntegrations } from "../../../states/integrations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/rootReducer";

export function LuinDeviceIntegrations(props: any) {
  const [device, setDevice] = useState<Device>();
  const [isSaveIntegrationModalOpen, setIsSaveIntegrationModalOpen] = useState<
    boolean
  >(false);

  const integrations: DeviceIntegrationsResponse = useSelector(
    (state: RootState) => state.integration.integrations || []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    new LuinDevice()
      .getDeviceByid(props.match.params.deviceId)
      .then((result) => {
        console.log("result", result);
        setDevice(result.data[0]);
      });

    dispatch(loadIntegrations(props.match.params.deviceId));
  }, [props, dispatch]);

  const addIntegration = () => {
    setIsSaveIntegrationModalOpen(true);
  };

  return (
    <>
      <div className={styles.breadCrumbsContainer}>
        <div>Devices &gt; {device?.name} &gt; Integrations</div>
      </div>

      <div className={styles.titleContainer}>
        <Title level={4}>Integrations</Title>
        <Button type="primary" onClick={addIntegration}>
          Add
        </Button>
        <LuinSaveIntegrationModal
          device={device}
          visible={isSaveIntegrationModalOpen}
          setSaveIntegrationModalOpen={setIsSaveIntegrationModalOpen}
        ></LuinSaveIntegrationModal>
      </div>

      <Row>
        {integrations.data.map((item) => (
          <Col style={{ margin: 8 }}>
            <LuinDeviceIntegrationItem
              integration={item}
            ></LuinDeviceIntegrationItem>
          </Col>
        ))}
      </Row>
    </>
  );
}
