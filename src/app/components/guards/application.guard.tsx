import React, { Component } from "react";
import { LuinApplication } from "../../api/application.api";

export class LuinApplicationGuard extends Component {
  applications: any;

  async componentDidMount() {
    const apps = await new LuinApplication()
      .listApplication()
      .then((result) => result.data);

    try {
      const firstApp = apps[0];
      window.location.pathname = `${firstApp.applicationId}/overview`;
    } catch {
      window.location.pathname = `empty-application`;
    }
  }

  render() {
    return <div>Loading applications...</div>;
  }
}
