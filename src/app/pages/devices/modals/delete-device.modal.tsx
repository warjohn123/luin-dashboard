import { Button, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LuinDevice } from "../../../api/device.api";
import { Device } from "../../../models/Device";
import { loadDevices, loadDevicesCount } from "../../../states/devices";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../states/toaster";

interface LuinDeleteDeviceModalType {
  device: Device;
  setIsDeleteDeviceModalOpen: any;
  visible: boolean;
}

export const LuinDeleteDeviceModal: React.FunctionComponent<LuinDeleteDeviceModalType> = ({
  device,
  visible,
  setIsDeleteDeviceModalOpen,
}) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const deleteDevice = async () => {
    setIsSaving(true);
    try {
      await new LuinDevice().deleteDevice(device.deviceId);
      setIsSaving(false);
      setIsDeleteDeviceModalOpen(false);
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
        setIsDeleteDeviceModalOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsDeleteDeviceModalOpen(false)}>
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
      <Text>Delete {device.name} device?</Text>
    </Modal>
  );
};
