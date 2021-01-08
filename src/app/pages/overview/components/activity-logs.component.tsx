import { Typography } from "antd";
import React from "react";
const { Title } = Typography;

export function LuinActivityLogs() {
  return (
    <div className="activity-logs-container">
      <Title level={5}>Activity Logs</Title>

      {[1, 2, 3, 4].map((item) => (
        <div className="activity-log-item" key={item}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod temporadfda...
          </p>
          <p className="time">about an hour ago</p>
        </div>
      ))}
    </div>
  );
}
