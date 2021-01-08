import React, { Component } from "react";
import { LuinInquiry } from "../../../api/inquiry.api";
import { LuinCountCard } from "../../../components/count-card/count-card.component";
import { InquiryCount } from "../../../models/Inquiry";

export class LuinInquiriesCountCard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    new LuinInquiry()
      .countInquiries()
      .then((result: InquiryCount) => {
        const count = result.Count;
        this.setState({ count });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  render() {
    const { count } = this.state as any;
    return (
      <LuinCountCard title="Total Inquiries" value={count}></LuinCountCard>
    );
  }
}
