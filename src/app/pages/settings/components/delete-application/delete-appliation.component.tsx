import { Button, Card, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { LuinApplication } from "../../../../api/application.api";
import { Application } from "../../../../models/Application";

export function LuinDeleteApplication() {
  const [form] = useForm();

  const applicationId = new LuinApplication().getCurrentAppIdFromPath();
  const [currentApplication, setCurrentApplication] = useState<Application>();
  const [applicationName, setApplicationName] = useState<string>();
  const [isDeleting, setIsDeleting] = useState<boolean>();

  useEffect(() => {
    new LuinApplication().getApplication(applicationId).then((result) => {
      const application = result.data[0];
      setCurrentApplication(application);
    });
  }, [applicationId]);

  const deleteApp = async () => {
    setIsDeleting(true);
    try {
      await new LuinApplication().deleteApplication(applicationId);
      window.location.pathname = "/";
      setIsDeleting(false);
    } catch (e) {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <Title level={4} className="title">
        Delete Application
      </Title>

      <Form layout="vertical" form={form} onFinish={deleteApp}>
        <Form.Item label="Type the Application Name before deleting the application">
          <Input
            onChange={(e) => setApplicationName(e.target.value)}
            placeholder="Enter application name"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={isDeleting}
            disabled={currentApplication?.name !== applicationName}
            htmlType="submit"
            danger
          >
            Delete Application
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
