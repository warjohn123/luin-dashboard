import { Card } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import styles from "./count-card.module.css";

interface CountCardProps {
  title: string;
  value: number;
}

export const LuinCountCard = (props: CountCardProps) => {
  return (
    <React.Fragment>
      <Card>
        <Title level={4} className={styles.countCardTitle}>
          {props.title}
        </Title>

        <div className={styles.countCardValue}>{props.value}</div>
      </Card>
    </React.Fragment>
  );
};
