import React from "react";
import { Row, Col } from "antd";
import { LuinProfile } from "./components/profile/profile.component";
import { LuinPaymentDetails } from "./components/payment-details/payment-details";

export const LuinAccountSettings = () => {
  return (
    <Row>
      <Col span={12} style={{ paddingRight: "12px" }}>
        <LuinProfile></LuinProfile>
      </Col>

      <Col span={12} style={{ paddingLeft: "12px" }}>
        <LuinPaymentDetails></LuinPaymentDetails>
      </Col>
    </Row>
  );
};
