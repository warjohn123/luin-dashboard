import { Col, Row } from "antd";
import React from "react";
import { LuinActivityLogs } from "./components/activity-logs.component";
import { OverviewGraph } from "./components/overview-graph.component";
import "../../styles/pages/overview/styles.scss";
import { LuinCountCard } from "../../components/count-card/count-card.component";
import { LuinDeviceCountCard } from "./components/device-count-card.component";
import { LuinUserCountCard } from "./components/user-count-card.component";
import { LuinSubscribersCountCard } from "./components/subscribers-count-card.component";
import { LuinInquiriesCountCard } from "./components/inquries-count-card.component";
import { LuinApplicationDetails } from "./components/application-details.component";
import { LuinSchedulesCountCard } from "./components/schedules-count-card.component";

export const LuinOverview = () => {
  return (
    <Row>
      <Col span={18} style={{ paddingRight: "12px" }}>
        <LuinApplicationDetails></LuinApplicationDetails>

        <Row style={{ marginBottom: "16px" }}>
          <Col span={8} style={{ paddingRight: "8px" }}>
            <LuinDeviceCountCard></LuinDeviceCountCard>
          </Col>
          <Col span={8} style={{ paddingRight: "8px", paddingLeft: "8px" }}>
            <LuinUserCountCard></LuinUserCountCard>
          </Col>
          <Col span={8} style={{ paddingLeft: "8px" }}>
            <LuinSubscribersCountCard></LuinSubscribersCountCard>
          </Col>
        </Row>
        <Row style={{ marginBottom: "16px" }}>
          <Col span={8} style={{ paddingRight: "8px" }}>
            <LuinInquiriesCountCard></LuinInquiriesCountCard>
          </Col>
          <Col span={8} style={{ paddingRight: "8px", paddingLeft: "8px" }}>
            <LuinCountCard
              title={"Total Integrations"}
              value={478}
            ></LuinCountCard>
          </Col>
          <Col span={8} style={{ paddingLeft: "8px" }}>
            {/* <LuinCountCard
              title={"Total Schedules"}
              value={478}
            ></LuinCountCard> */}
            <LuinSchedulesCountCard></LuinSchedulesCountCard>
          </Col>
        </Row>

        <OverviewGraph title={"Graph Title"}></OverviewGraph>
      </Col>

      <Col span={6} style={{ paddingLeft: "12px" }}>
        <LuinActivityLogs />
      </Col>
    </Row>
  );
};
