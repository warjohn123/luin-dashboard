import { Avatar, Button, Dropdown, Menu } from "antd";
import React, { Component } from "react";
import { ReactComponent as Ellipses } from "../../../assets/icons/ellipse.svg";
import { LuinToken } from "../../api/token.api";
import styles from "./header-account-options.module.css";
import { LuinApplication } from "../../api/application.api";

export class LuinHeaderAccountOptionsComponent extends Component {
  state: any;

  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = () => {
    const token = new LuinToken().getAccessToken();

    new LuinToken().getTokenData(token).then((result) => {
      const username = result.data.data.context.username;
      try {
        this.setState({ username });
      } catch {
        throw new Error("Authorization error.");
      }
    });
  };

  logoutUser = () => {
    new LuinToken().deleteAccessToken();
    window.location.pathname = "/login";
  };

  accountSettings = () => {
    const applicationId = new LuinApplication().getCurrentAppIdFromPath();
    window.location.pathname = `/${applicationId}/account`;
  };

  menuItems = () => {
    return (
      <Menu>
        {/* <Menu.Item key="0">Profile</Menu.Item> */}
        <Menu.Item key="1" onClick={this.accountSettings}>
          Account Settings
        </Menu.Item>
        <Menu.Item key="2" onClick={this.logoutUser}>
          Logout
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const username = this.state.username as string;
    return (
      <div className="account-container">
        <Avatar className={styles.avatar}>
          {username && username[0].toUpperCase()}
        </Avatar>
        <span>{this.state.username}</span>
        <Dropdown overlay={this.menuItems} trigger={["click"]}>
          <Button className={styles.ellipses} type="text" shape="circle">
            <Ellipses />
          </Button>
        </Dropdown>
      </div>
    );
  }
}
