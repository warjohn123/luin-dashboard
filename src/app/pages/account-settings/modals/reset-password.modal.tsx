import React, { useState } from "react";
import { Modal, Form, Button, Input } from "antd";
import { useForm } from "antd/lib/form/Form";

interface LuinResetPasswordType {
  setIsResetPasswordModalOpen: any;
  visible: boolean;
}

export const LuinResetPasswordModal: React.FunctionComponent<LuinResetPasswordType> = ({
  visible,
  setIsResetPasswordModalOpen,
}) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [form] = useForm();

  const resetPassword = () => {
    setIsSaving(true);

    setIsSaving(false);
  };

  return (
    <Modal
      title="Reset Password"
      onCancel={() => {
        setIsResetPasswordModalOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsResetPasswordModalOpen(false)}>
          Cancel
        </Button>,
        <Button
          type="primary"
          key="submit"
          form="passwordForm"
          onClick={resetPassword}
          loading={isSaving}
          htmlType="submit"
        >
          Ok
        </Button>,
      ]}
      visible={visible}
    >
      <Form
        id="passwordForm"
        layout="vertical"
        form={form}
        onFinish={resetPassword}
      >
        <Form.Item
          name="password"
          label="Password"
          key="password"
          rules={[
            {
              required: true,
              message: "Please enter password",
            },
          ]}
        >
          <Input placeholder="Enter password"></Input>
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          key="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input placeholder="Enter password"></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};
