import { Card } from "antd";
import React from "react";
import { ReactComponent as Avatar } from "../../../../../assets/icons/avatar.svg";
import styles from "./subscriber-item.module.css";

interface SubscriberItemType {
  subscriptionEmail: string;
}

export const LuinSubscriberItem = ({
  subscriptionEmail,
}: SubscriberItemType) => {
  return (
    <Card className={styles.subscriberItemCard}>
      <Avatar className={styles.avatar}></Avatar>
      {subscriptionEmail}
    </Card>
  );
};
