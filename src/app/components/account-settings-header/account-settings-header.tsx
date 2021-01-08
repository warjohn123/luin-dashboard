import React from "react";
import { Layout } from "antd";
import Title from "antd/lib/typography/Title";

export const LuinAccountSettingsHeader = () => {
  return (
    <Layout.Header>
      <Title style={{ marginTop: 17 }} level={4}>
        Account Settings
      </Title>
    </Layout.Header>
  );
};
