import { Layout } from "antd";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LuinHeaderBar } from "./components/header-bar/header-bar.component";
import { LuinDevices } from "./pages/devices/devices.page";
import { LuinLuinLeads } from "./pages/leads/leads.page";
import { LuinSettings } from "./pages/settings/settings.page";
import { LuinOverview } from "./pages/overview/overview.page";
import { LuinUsers } from "./pages/users/users.page";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./states/rootReducer";
import { setIsAppBarOpen } from "./states/app-bar";
import { LuinApplicationGuard } from "./components/guards/application.guard";
import { LuinEmptyApplicationPlaceholder } from "./components/empty-application-placeholder/empty-application-placeholder.component";
import { LuinSchedules } from "./pages/schedules/schedules.page";
import { LuinAccountSettings } from "./pages/account-settings/account-settings";
const { Content } = Layout;

export function LuinRoutes() {
  const dispatch = useDispatch();

  const isAppBarOpen = useSelector(
    (state: RootState) => state.appBar.isAppBarOpen
  );

  return (
    <Router>
      <Layout>
        <LuinHeaderBar></LuinHeaderBar>
        <Layout>
          <Content>
            {isAppBarOpen && (
              <div
                className="backdrop"
                onClick={() => {
                  dispatch(setIsAppBarOpen(false));
                }}
              ></div>
            )}
            <Switch>
              <Route path="/:appId/overview">
                <LuinOverview></LuinOverview>
              </Route>
              <Route path="/:appId/devices">
                <LuinDevices></LuinDevices>
              </Route>
              <Route path="/:appId/users">
                <LuinUsers></LuinUsers>
              </Route>
              <Route path="/:appId/leads">
                <LuinLuinLeads></LuinLuinLeads>
              </Route>
              <Route path="/:appId/schedules">
                <LuinSchedules></LuinSchedules>
              </Route>
              <Route path="/:appId/settings">
                <LuinSettings></LuinSettings>
              </Route>
              <Route path="/empty-application">
                <LuinEmptyApplicationPlaceholder></LuinEmptyApplicationPlaceholder>
              </Route>
              <Route path="/:appId/account">
                <LuinAccountSettings></LuinAccountSettings>
              </Route>
              <Route exact path="/">
                <LuinApplicationGuard></LuinApplicationGuard>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}
