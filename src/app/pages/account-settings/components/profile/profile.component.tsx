import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { useForm } from "antd/lib/form/Form";
import { LuinResetPasswordModal } from "../../modals/reset-password.modal";
import { LuinAccount } from "../../../../api/account.api";
import { User } from "../../../../models/User";
import { useDispatch } from "react-redux";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../../states/toaster";

export function LuinProfile() {
  const [form] = useForm();
  const [isSaving, setIsSaving] = useState<boolean>();
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState<
    boolean
  >(false);
  const [user, setUser] = useState<User>();
  const dispatch = useDispatch();

  const handleFormSubmit = async () => {
    setIsSaving(true);
    let accountObj: User = {
      ...user,
      ...form.getFieldsValue(),
    };

    try {
      await new LuinAccount().updateSelfAccount(accountObj);
      dispatch(openSuccessNotification());
    } catch (e) {
      dispatch(openErrorNotification());
    }
    setIsSaving(false);
  };

  useEffect(() => {
    new LuinAccount().getAccount().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Card>
      <Title level={4} className="title">
        Profile
      </Title>

      {user && (
        <Form
          layout="vertical"
          id="profileForm"
          initialValues={user}
          form={form}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Full Name"
            key="fullName"
            name="fullName"
            rules={[{ required: true, message: "Full Name is required." }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            key="username"
            name="username"
            rules={[
              { required: true, message: "Email is required." },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              style={{ marginRight: 16 }}
              loading={isSaving}
            >
              Save
            </Button>
            <Button
              loading={isSaving}
              onClick={() => setIsResetPasswordModalOpen(true)}
            >
              Reset Password
            </Button>

            <LuinResetPasswordModal
              visible={isResetPasswordModalOpen}
              setIsResetPasswordModalOpen={setIsResetPasswordModalOpen}
            ></LuinResetPasswordModal>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}
