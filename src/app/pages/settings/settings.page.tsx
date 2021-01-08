import { Col, Row } from "antd";
import React from "react";
import { LuinAccountRecovery } from "./components/account-recovery/account-recovery.component";
import { CustomApplicationVariables } from "./components/custom-application-variables/custom-application-variables.component";
import { LuinDeleteApplication } from "./components/delete-application/delete-appliation.component";

export function LuinSettings() {
  return (
    <Row>
      <Col span={10} style={{ paddingRight: "8px" }}>
        <LuinAccountRecovery></LuinAccountRecovery>

        <div style={{ marginTop: "16px" }}>
          <LuinDeleteApplication></LuinDeleteApplication>
        </div>
      </Col>

      <Col span={14} style={{ paddingLeft: "8px" }}>
        <CustomApplicationVariables></CustomApplicationVariables>
      </Col>
    </Row>
  );
}
