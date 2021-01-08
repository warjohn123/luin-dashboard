import { Col, Row } from "antd";
import React from "react";
import { LuinInquiries } from "./components/inquiries/inquiries.component";
import { LuinSubscribers } from "./components/subscribers/subscribers.component";
import "../../styles/pages/leads/styles.scss";

export function LuinLuinLeads() {
  return (
    <Row>
      <Col span={12} style={{ paddingRight: "8px" }}>
        <LuinSubscribers></LuinSubscribers>
      </Col>

      <Col span={12} style={{ paddingLeft: "8px" }}>
        <LuinInquiries></LuinInquiries>
      </Col>
    </Row>
  );
}
