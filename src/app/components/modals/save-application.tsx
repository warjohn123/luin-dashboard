import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { LuinApplication } from "../../api/application.api";
import { Application } from "../../models/Application";
import { useDispatch } from "react-redux";
import {
  loadApplications,
  loadCurrentApplicationById,
} from "../../states/application";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../states/toaster";

const { TextArea } = Input;

interface LuinSaveApplicationModalType {
  visible: boolean;
  application?: Application;
  setApplication?: any;
  setIsSaveApplicationOpen: any;
}

export const LuinSaveApplicationModal: React.FunctionComponent<LuinSaveApplicationModalType> = ({
  visible,
  application,
  setApplication,
  setIsSaveApplicationOpen,
}) => {
  const [form] = useForm();
  const dispatch = useDispatch();

  const [isSaving, setIsSaving] = useState<boolean>();

  const handleOnModalOk = async () => {
    setIsSaving(true);
    try {
      let applicationObj: Application = {
        isSandbox: false,
        name: form.getFieldValue("name"),
        description: form.getFieldValue("description"),
      };

      let result: any;

      if (application) {
        result = await new LuinApplication().updateApplication(
          application?.applicationId || "",
          applicationObj
        );
        setApplication(result["data"]["Attributes"]);
        dispatch(
          loadCurrentApplicationById(result["data"]["Attributes"].applicationId)
        );
      } else {
        result = await new LuinApplication().createApplication(applicationObj);
      }
      dispatch(openSuccessNotification());
      dispatch(loadApplications());
      setIsSaving(false);
      setIsSaveApplicationOpen(false);

      if (!application) {
        window.location.pathname = `${result.data.data.applicationId}/overview`;
      }
    } catch (e) {
      dispatch(openErrorNotification());
      setIsSaving(false);
    }
  };

  return (
    <Modal
      title={application ? "Edit Application" : "Create New Application"}
      onCancel={() => {
        setIsSaveApplicationOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsSaveApplicationOpen(false)}>Cancel</Button>,
        <Button
          type="primary"
          form="applicationForm"
          key="submit"
          loading={isSaving}
          htmlType="submit"
        >
          Save
        </Button>,
      ]}
      visible={visible}
    >
      <Form
        id="applicationForm"
        layout="vertical"
        form={form}
        onFinish={handleOnModalOk}
        initialValues={application}
      >
        <Form.Item
          name="name"
          label="Application Name"
          rules={[
            {
              required: true,
              message: "Please input application name",
            },
          ]}
        >
          <Input placeholder="Enter application name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea></TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
};
