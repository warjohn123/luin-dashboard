import { Card } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

import { Bar } from "react-chartjs-2";

interface OverviewGraphType {
  title: string;
}

export const OverviewGraph: React.FunctionComponent<OverviewGraphType> = ({
  title,
}) => {
  const data = (canvas: any) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 100, 0);
    return {
      backgroundColor: gradient,
    };
  };
  return (
    <>
      <Card className="summary-item">
        <Title level={4} className="title">
          {title}
        </Title>

        <Bar data={data}></Bar>
      </Card>
    </>
  );
};
