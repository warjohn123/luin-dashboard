import { Button, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LuinDevice } from "../../../api/device.api";
import { DeviceIntegration } from "../../../models/Device";
import { loadDevices, loadDevicesCount } from "../../../states/devices";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../states/toaster";

interface LuinDeleteDeviceIntegrationModalType {
  integration: DeviceIntegration;
  setIsDeleteDeviceIntegrationModalOpen: any;
  visible: boolean;
}

export const LuinDeleteDeviceIntegrationModal: React.FunctionComponent<LuinDeleteDeviceIntegrationModalType> = ({
  integration,
  visible,
  setIsDeleteDeviceIntegrationModalOpen,
}) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const deleteDevice = async () => {
    setIsSaving(true);
    try {
      await new LuinDevice().deleteDevice(integration?.integrationId || "");
      setIsSaving(false);
      setIsDeleteDeviceIntegrationModalOpen(false);
      dispatch(openSuccessNotification());
      dispatch(loadDevices());
      dispatch(loadDevicesCount());
      //   window.location.pathname = `${result.data.data.applicationId}/overview`;
    } catch (e) {
      dispatch(openErrorNotification());
      setIsSaving(false);
    }
  };

  return (
    <Modal
      title="Delete Confirmation"
      onCancel={() => {
        setIsDeleteDeviceIntegrationModalOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsDeleteDeviceIntegrationModalOpen(false)}>
          Cancel
        </Button>,
        <Button
          type="primary"
          key="submit"
          onClick={deleteDevice}
          loading={isSaving}
          htmlType="submit"
        >
          Ok
        </Button>,
      ]}
      visible={visible}
    >
      <Text>Delete {integration.integrationId} integration?</Text>
    </Modal>
  );
};
