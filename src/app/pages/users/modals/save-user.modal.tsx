import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LuinAccount } from "../../../api/account.api";
import { User } from "../../../models/User";
import { loadUsers, loadUsersCount } from "../../../states/user";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../states/toaster";

interface LuinSaveUserModalType {
  user?: User;
  setIsSaveUserModalOpen: any;
  visible: boolean;
}

export const LuinSaveUserModal: React.FunctionComponent<LuinSaveUserModalType> = ({
  user,
  visible,
  setIsSaveUserModalOpen,
}) => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const saveUser = async () => {
    setIsSaving(true);
    try {
      //put create function here
      let accountObj: User = {
        ...form.getFieldsValue(),
        email: form.getFieldValue("username"),
        isActive: true,
        custom: {},
      };

      if (user) {
        await new LuinAccount().updateUserAccount(user, accountObj);
      } else {
        await new LuinAccount().createAccount(accountObj);
      }
      setIsSaving(false);
      setIsSaveUserModalOpen(false);
      dispatch(loadUsers());
      dispatch(openSuccessNotification());
      dispatch(loadUsersCount());
    } catch (e) {
      dispatch(openErrorNotification());
      setIsSaving(false);
    }
  };

  return (
    <Modal
      title={user ? "Edit User" : "Add User"}
      onCancel={() => {
        setIsSaveUserModalOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsSaveUserModalOpen(false)}>Cancel</Button>,
        <Button
          type="primary"
          key="submit"
          form="userForm"
          loading={isSaving}
          htmlType="submit"
        >
          Ok
        </Button>,
      ]}
      visible={visible}
    >
      <Form
        id="userForm"
        layout="vertical"
        form={form}
        onFinish={saveUser}
        initialValues={user}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          key="fullName"
          rules={[
            {
              required: true,
              message: "Please enter full name",
            },
          ]}
        >
          <Input placeholder="Enter full name"></Input>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          key="password"
          hidden={!!user}
          rules={[
            {
              required: true,
              message: "Please enter password",
            },
          ]}
        >
          <Input.Password placeholder="Enter password"></Input.Password>
        </Form.Item>
        <Form.Item
          name="username"
          label="User Name"
          key="username"
          rules={[
            {
              required: true,
              message: "Please enter user name",
            },
          ]}
        >
          <Input placeholder="Enter user name"></Input>
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          key="type"
          rules={[
            {
              required: true,
              message: "Please enter type",
            },
          ]}
        >
          <Input placeholder="Enter type"></Input>
        </Form.Item>
        <Form.Item
          name="validationStatus"
          label="Status"
          key="validationStatus"
          rules={[
            {
              required: true,
              message: "Please enter status",
            },
          ]}
        >
          <Input placeholder="Enter status"></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};
