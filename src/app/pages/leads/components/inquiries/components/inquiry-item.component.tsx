import { Card } from "antd";
import React from "react";
import { ReactComponent as Avatar } from "../../../../../../assets/icons/avatar.svg";
import { Inquiry } from "../../../../../models/Inquiry";
import moment from "moment";

interface InquiryItemType {
  inquiry: Inquiry;
}

export const LuinInquiryItem: React.FunctionComponent<InquiryItemType> = ({
  inquiry,
}) => {
  return (
    <Card className="inquiry-item-card">
      <Avatar style={{ display: "inline-block" }}></Avatar>
      <div className="content-container">
        <p className="name">{inquiry.name}</p>
        <p>{inquiry.email}</p>
        <p>{inquiry.message}</p>
        <p className="time">
          Sent last{" "}
          {moment(inquiry.dateCreated).format("MMMM DD, yyyy hh:mm a")}
        </p>
      </div>
    </Card>
  );
};
