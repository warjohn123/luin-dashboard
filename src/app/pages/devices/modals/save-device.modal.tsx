import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LuinDevice } from "../../../api/device.api";
import { Device } from "../../../models/Device";
import { loadDevices, loadDevicesCount } from "../../../states/devices";
import ReactJson from "react-json-view";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../states/toaster";

interface LuinSaveDeviceModalType {
  device?: Device;
  setDevice?: any;
  setIsSaveDeviceModalOpen: any;
  visible: boolean;
}

export const LuinSaveDeviceModal: React.FunctionComponent<LuinSaveDeviceModalType> = ({
  device,
  visible,
  setDevice,
  setIsSaveDeviceModalOpen,
}) => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [custom, setCustom] = useState<any>();

  const cleanDeviceId = (deviceId: string) => {
    return deviceId.split(" ").join("-");
  };

  const saveDevice = async () => {
    setIsSaving(true);
    try {
      let deviceObj: Device = {
        ...form.getFieldsValue(),
        deviceId: cleanDeviceId(form.getFieldValue("deviceId")),
        custom: custom,
        isPrivate: true,
        avatar: "null",
        enableStorage: false,
        attributeNames: [],
      };

      if (device) {
        await new LuinDevice().updateDevice(deviceObj, deviceObj);
      } else {
        await new LuinDevice().createDevice(deviceObj);
      }
      setIsSaving(false);
      setIsSaveDeviceModalOpen(false);
      dispatch(openSuccessNotification());
      dispatch(loadDevices());
      dispatch(loadDevicesCount());
    } catch (e) {
      console.log("e", e);
      dispatch(openErrorNotification());
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setCustom(device?.custom);
  }, [device]);

  return (
    <Modal
      title={device ? "Edit Device" : "Add Device"}
      onCancel={() => {
        setIsSaveDeviceModalOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsSaveDeviceModalOpen(false)}>Cancel</Button>,
        <Button
          type="primary"
          key="submit"
          form="deviceForm"
          loading={isSaving}
          htmlType="submit"
        >
          Ok
        </Button>,
      ]}
      visible={visible}
    >
      <Form
        id="deviceForm"
        layout="vertical"
        form={form}
        onFinish={saveDevice}
        initialValues={device}
      >
        <Form.Item
          name="name"
          label="Device Name"
          key="name"
          rules={[
            {
              required: true,
              message: "Please enter device name",
            },
          ]}
        >
          <Input placeholder="Enter device name"></Input>
        </Form.Item>
        <Form.Item
          name="deviceId"
          label="Device ID"
          key="deviceId"
          rules={[
            {
              required: true,
              message: "Please enter device id",
            },
          ]}
        >
          <Input
            disabled={device !== undefined}
            placeholder="Enter device id"
          ></Input>
        </Form.Item>
        <Form.Item name="description" label="Description" key="description">
          <TextArea placeholder="Write your description here"></TextArea>
        </Form.Item>
        <Form.Item label="Custom" key="custom">
          <ReactJson
            src={custom}
            onAdd={(value) => {
              setCustom(value.updated_src);
            }}
            onEdit={(value) => {
              setCustom(value.updated_src);
            }}
            onDelete={(value) => {
              setCustom(value.updated_src);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
