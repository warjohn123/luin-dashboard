import { useForm } from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Device, DeviceIntegration } from "../../../models/Device";
import { LuinDevice } from "../../../api/device.api";
import { loadIntegrations } from "../../../states/integrations";
import { useDispatch } from "react-redux";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../states/toaster";

interface LuinSaveIntegrationModalType {
  integration?: DeviceIntegration;
  device?: Device;
  setSaveIntegrationModalOpen: any;
  visible: boolean;
}

export const LuinSaveIntegrationModal: React.FunctionComponent<LuinSaveIntegrationModalType> = ({
  integration,
  visible,
  device,
  setSaveIntegrationModalOpen,
}) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleFormSubmit = async () => {
    setIsSaving(true);

    try {
      let integrationObj: DeviceIntegration = {
        deviceId: device?.deviceId || "",
      };

      if (integration) {
        // await new LuinDevice().updateDevice(deviceObj, deviceObj);
      } else {
        await new LuinDevice().createDeviceIntegration(integrationObj);
      }

      setIsSaving(false);
      setSaveIntegrationModalOpen(false);
      dispatch(openSuccessNotification());
      dispatch(loadIntegrations(device?.deviceId || ""));
    } catch (e) {
      dispatch(openErrorNotification());
      setIsSaving(false);
    }
  };

  return (
    <Modal
      title={integration ? "Edit Integration" : "Add Integration"}
      onCancel={() => {
        setSaveIntegrationModalOpen(false);
      }}
      footer={[
        <Button onClick={() => setSaveIntegrationModalOpen(false)}>
          Cancel
        </Button>,
        <Button
          type="primary"
          key="submit"
          onClick={handleFormSubmit}
          loading={isSaving}
          htmlType="submit"
        >
          Add
        </Button>,
      ]}
      visible={visible}
    >
      <Form
        id="deviceForm"
        layout="vertical"
        form={form}
        onFinish={handleFormSubmit}
        initialValues={integration}
      >
        <Form.Item
          name="name"
          label="Integration"
          key="name"
          rules={[
            {
              required: true,
              message: "Send Data to Device",
            },
          ]}
        >
          <Input placeholder="Select integration"></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};
