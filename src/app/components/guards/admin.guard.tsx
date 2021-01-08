import React, { Component } from "react";
import { LuinToken } from "../../api/token.api";
import { LuinRoutes } from "../../routes";

export class LuinAdminGuard extends Component {
  constructor(props: any) {
    super(props);

    if (!this.isLoggedIn) {
      window.location.pathname = "login";
    }
  }

  protected get isLoggedIn() {
    return new LuinToken().getAccessToken();
  }

  render() {
    return <LuinRoutes></LuinRoutes>;
  }
}
