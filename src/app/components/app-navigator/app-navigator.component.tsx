import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuinApplication } from "../../api/application.api";

export const LuinAppNavigator = () => {
  const location = useLocation();

  const [applicationId, setCurrentApplicationId] = useState("");

  const selectedTab = new LuinApplication().getCurrentAppTab();

  const menus = [
    { name: "Overview", key: "/overview" },
    { name: "Devices", key: "/devices" },
    { name: "Users", key: "/users" },
    { name: "Leads", key: "/leads" },
    { name: "Schedules", key: "/schedules" },
    { name: "Settings", key: "/settings" },
  ];

  const [currentTab, setCurrentTab] = useState<string>(selectedTab);

  useEffect(() => {
    setCurrentApplicationId(getApplicationId());
  }, [location]);

  const handleTabClick = (e: any) => {
    setCurrentTab(e.key);
  };

  const getApplicationId = (): string => {
    return new LuinApplication().getCurrentAppIdFromPath();
  };

  return (
    <>
      {getApplicationId() !== "empty-application" && (
        <Layout.Header>
          <Menu
            mode="horizontal"
            selectedKeys={[currentTab]}
            onClick={handleTabClick}
          >
            {menus.map((menu) => (
              <Menu.Item key={menu.key}>
                {menu.name}
                <Link to={`/${applicationId}${menu.key}`} />
              </Menu.Item>
            ))}
          </Menu>
        </Layout.Header>
      )}
    </>
  );
};
