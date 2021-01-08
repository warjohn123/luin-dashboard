import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import styles from "../signup.module.scss";
import { useHistory } from "react-router-dom";
import { LuinAccount } from "../../../api/account.api";

interface SignupDetails {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export function LuinSignupForm() {
  const [form] = useForm();
  const history = useHistory();

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const handleFormSubmit = async (credential: SignupDetails) => {
    setIsLoggingIn(true);

    credential.username = credential.email;

    try {
      await new LuinAccount().register(credential);
      history.goBack();
    } catch (e) {
      setIsLoggingIn(false);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
      <Form.Item
        label="Full name"
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please input full name",
          },
        ]}
      >
        <Input placeholder="Full name" />
      </Form.Item>
      {/* <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input username",
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item> */}
      <Form.Item
        label="Email address"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input email address",
          },
        ]}
      >
        <Input placeholder="Email address" type="email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input password",
          },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm"
        rules={[
          {
            required: true,
            message: "Please input password",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
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
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          loading={isLoggingIn}
          className={styles.LoginButton}
          type="primary"
          htmlType="submit"
        >
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
}
