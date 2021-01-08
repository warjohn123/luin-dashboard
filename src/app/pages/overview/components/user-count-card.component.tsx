import React, { Component } from "react";
import { LuinAccount } from "../../../api/account.api";
import { LuinCountCard } from "../../../components/count-card/count-card.component";
import { UserCount } from "../../../models/User";

export class LuinUserCountCard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    new LuinAccount()
      .countAccounts()
      .then((result: UserCount) => {
        const count = result.Count;
        this.setState({ count });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  render() {
    const { count } = this.state as any;
    return <LuinCountCard title="Total Users" value={count}></LuinCountCard>;
  }
}
