import React, { Component } from "react";
import { LuinDevice } from "../../../api/device.api";
import { LuinCountCard } from "../../../components/count-card/count-card.component";

export class LuinDeviceCountCard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    new LuinDevice().countAdminDevices().then((result) => {
      const count = result.Count;
      this.setState({ count });
    });
  }

  render() {
    const { count } = this.state as any;
    return <LuinCountCard title="Total Devices" value={count}></LuinCountCard>;
  }
}
