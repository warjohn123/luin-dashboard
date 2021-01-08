import React, { Component } from "react";
import { LuinInquiry } from "../../../api/inquiry.api";
import { LuinCountCard } from "../../../components/count-card/count-card.component";
import { InquiryCount } from "../../../models/Inquiry";
import { LuinSchedule } from "../../../api/schedule.api";
import { ScheduleCount } from "../../../models/Schedule";

export class LuinSchedulesCountCard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    new LuinSchedule()
      .countSchedules()
      .then((result: ScheduleCount) => {
        const count = result.count;
        this.setState({ count });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  render() {
    const { count } = this.state as any;
    return (
      <LuinCountCard title="Total Schedules" value={count}></LuinCountCard>
    );
  }
}
