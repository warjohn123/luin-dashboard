import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LuinAuth } from "../../../api/auth.api";
import { useForm } from "antd/lib/form/Form";
import { LuinToken } from "../../../api/token.api";
import styles from "../login.module.scss";
import { useDispatch } from "react-redux";
import { openErrorNotification } from "../../../states/toaster";

interface LoginDetails {
  username: string;
  password: string;
}

export function LuinLoginForm() {
  const [form] = useForm();
  const dispatch = useDispatch();

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const handleFormSubmit = (credential: LoginDetails) => {
    setIsLoggingIn(true);
    new LuinAuth()
      .authenticate(credential.username, credential.password)
      .then((result) => {
        const token = result.data.response;
        new LuinToken().saveAccessToken(token);
        new LuinToken().saveUsername(credential.username);
        window.location.pathname = "/";
      })
      .catch((err) => {
        dispatch(openErrorNotification("Invalid username/password"));
        setIsLoggingIn(false);
      });
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
      <Form.Item
        label="Email address"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input email address",
          },
        ]}
      >
        <Input placeholder="Email address" />
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
      <Form.Item>
        <Button
          loading={isLoggingIn}
          className={styles.LoginButton}
          type="primary"
          htmlType="submit"
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
}
