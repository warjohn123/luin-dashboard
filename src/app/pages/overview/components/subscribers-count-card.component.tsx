import React, { Component } from "react";
import { LuinSubscriber } from "../../../api/subscriber.api";
import { LuinCountCard } from "../../../components/count-card/count-card.component";
import { SubscriberCount } from "../../../models/Subscriber";

export class LuinSubscribersCountCard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    new LuinSubscriber()
      .countSubscribers()
      .then((result: SubscriberCount) => {
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
      <LuinCountCard title="Total Subscribers" value={count}></LuinCountCard>
    );
  }
}
