import { Button, Card, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { LuinApplication } from "../../../../api/application.api";
import { useDispatch } from "react-redux";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../../states/toaster";

export function LuinAccountRecovery() {
  const [form] = useForm();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const applicationId: string = new LuinApplication().getCurrentAppIdFromPath();

  const [emailSender, setEmailSender] = useState<string>();
  const [nameSender, setNameSender] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    new LuinApplication().getApplication(applicationId).then((result) => {
      const app = result.data[0];
      setNameSender(app.forgotPasswordNameSender);
      setEmailSender(app.forgotPasswordEmailSender);
    });
  }, [applicationId]);

  const handleFormSubmit = async () => {
    setIsSaving(true);
    let data = {
      forgotPasswordNameSender: nameSender,
      forgotPasswordEmailSender: emailSender,
    };

    try {
      await new LuinApplication().updateApplication(applicationId, data);
      dispatch(openSuccessNotification());
      setIsSaving(false);
    } catch (e) {
      dispatch(openErrorNotification());
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <Title level={4} className="title">
        Account Recovery
      </Title>

      <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
        <Form.Item
          label="Email Sender"
          rules={[
            { required: true, message: "Subscriber email is required." },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input
            value={emailSender}
            onChange={(e) => setEmailSender(e.target.value)}
            placeholder="Enter email sender"
          />
        </Form.Item>

        <Form.Item
          label="Name Sender"
          rules={[{ required: true, message: "Name is required." }]}
        >
          <Input
            value={nameSender}
            onChange={(e) => setNameSender(e.target.value)}
            placeholder="Enter name sender"
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" loading={isSaving}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
